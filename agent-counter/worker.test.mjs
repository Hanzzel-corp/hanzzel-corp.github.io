import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import worker, { agentFromUserAgent } from './worker.mjs';

const originalFetch = globalThis.fetch;
before(() => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://hanzzel-corp.github.io/agent-feed.json');
    assert.equal(options?.redirect, 'manual');
    return new Response('{"message":"Hola, agentes"}', { status: 200 });
  };
});
after(() => { globalThis.fetch = originalFetch; });

function fakeDB() {
  const entries = [];
  return {
    entries,
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async run() {
              assert.match(sql, /INSERT INTO agent_hits/);
              const [day, site, agent] = args;
              const existing = entries.find(row => row.day === day && row.site === site && row.agent === agent);
              if (existing) existing.requests++;
              else entries.push({ day, site, agent, requests: 1 });
            },
            async all() {
              assert.match(sql, /SELECT day/);
              return { results: entries.filter(row => row.day >= args[0]) };
            },
          };
        },
      };
    },
  };
}

function req(path, method = 'GET', ua = '', auth = '') {
  return new Request('https://test.workers.dev' + path, {
    method,
    headers: { 'user-agent': ua, ...(auth ? { authorization: auth } : {}) },
  });
}

test('recognized agents are explicit and not all bots', () => {
  assert.equal(agentFromUserAgent('Mozilla/5.0 (compatible; OAI-SearchBot/1.0)'), 'OAI-SearchBot');
  assert.equal(agentFromUserAgent('Claude-SearchBot/1.0'), 'Claude-SearchBot');
  assert.equal(agentFromUserAgent('Googlebot/2.1'), null);
  assert.equal(agentFromUserAgent('Mozilla/5.0 Chrome/140.0'), null);
});

test('public feed is served verbatim, human visits are not counted', async () => {
  const db = fakeDB();
  const response = await worker.fetch(req('/agent-feed.json?site=portfolio', 'GET', 'Mozilla/5.0'), { DB: db });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), '{"message":"Hola, agentes"}');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(db.entries.length, 0);
});

test('agent GET counts once per HTTP request, grouped by site', async () => {
  const db = fakeDB(), env = { DB: db, STATS_TOKEN: 'very-secret-token' };
  const bot = 'OAI-SearchBot/1.0';
  await worker.fetch(req('/agent-feed.json?site=portfolio', 'GET', bot), env);
  await worker.fetch(req('/agent-feed.json?site=portfolio', 'GET', bot), env);
  await worker.fetch(req('/agent-feed.json?site=store', 'GET', bot), env);
  assert.equal(db.entries.length, 2);
  assert.deepEqual(db.entries.map(x => [x.site, x.agent, x.requests]), [
    ['portfolio', 'OAI-SearchBot', 2],
    ['store', 'OAI-SearchBot', 1],
  ]);
  const unauthorized = await worker.fetch(req('/stats'), env);
  assert.equal(unauthorized.status, 401);
  assert.doesNotMatch(await unauthorized.text(), /very-secret-token/);
  const authorized = await worker.fetch(req('/stats?days=30', 'GET', '', 'Bearer very-secret-token'), env);
  const stats = await authorized.json();
  assert.equal(stats.total_requests, 3);
  assert.equal(stats.verified_agent_identity, false);
});

test('HEAD, unknown source, and writes never count', async () => {
  const db = fakeDB(), env = { DB: db };
  assert.equal((await worker.fetch(req('/agent-feed.json?site=portfolio', 'HEAD', 'ChatGPT-User'), env)).status, 200);
  assert.equal((await worker.fetch(req('/agent-feed.json?site=unknown', 'GET', 'ChatGPT-User'), env)).status, 400);
  assert.equal((await worker.fetch(req('/agent-feed.json?site=store', 'POST', 'ChatGPT-User'), env)).status, 405);
  assert.equal((await worker.fetch(req('/other', 'GET', 'ChatGPT-User'), env)).status, 404);
  assert.equal(db.entries.length, 0);
});

test('failed upstream does not increment and returns error', async () => {
  const saved = globalThis.fetch;
  globalThis.fetch = async () => new Response('unavailable', { status: 404 });
  try {
    const db = fakeDB();
    const resp = await worker.fetch(req('/agent-feed.json?site=map', 'GET', 'GPTBot'), { DB: db });
    assert.equal(resp.status, 400);
    const failed = await worker.fetch(req('/agent-feed.json?site=knowledge-map', 'GET', 'GPTBot'), { DB: db });
    assert.equal(failed.status, 502);
    assert.equal(db.entries.length, 0);
  } finally { globalThis.fetch = saved; }
});
