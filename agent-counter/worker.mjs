/**
 * Contador opcional de solicitudes al JSON público de Hanzzel Corp.
 * No modifica la web ni el JSON. No se activa hasta desplegarlo en una cuenta propia.
 * Los nombres de agentes provienen del User-Agent declarado, NO de verificación de identidad.
 */
const FEED_URL = 'https://hanzzel-corp.github.io/agent-feed.json';
const SITES = new Set(['portfolio', 'store', 'knowledge-map']);
const AGENTS = [
  ['OAI-SearchBot', /\bOAI-SearchBot\b/i],
  ['ChatGPT-User', /\bChatGPT-User\b/i],
  ['GPTBot', /\bGPTBot\b/i],
  ['Claude-SearchBot', /\bClaude-SearchBot\b/i],
  ['Claude-User', /\bClaude-User\b/i],
  ['ClaudeBot', /\bClaudeBot\b/i],
  ['PerplexityBot', /\bPerplexityBot\b/i],
  ['Perplexity-User', /\bPerplexity-User\b/i],
];

function agentFromUserAgent(ua) {
  if (!ua) return null;
  return AGENTS.find(([, pattern]) => pattern.test(ua))?.[0] ?? null;
}

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
};

function json(body, status = 200, privateResponse = false) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...(privateResponse ? { 'x-robots-tag': 'noindex, nofollow' } : {}),
    },
  });
}

async function getStatistics(request, env, url) {
  if (!env.STATS_TOKEN || typeof env.STATS_TOKEN !== 'string') {
    return json({ error: 'not_configured' }, 503, true);
  }
  const expected = "Bearer " + env.STATS_TOKEN;
  if (request.headers.get('authorization') !== expected) {
    return json({ error: 'unauthorized' }, 401, true);
  }
  if (!env.DB) return json({ error: 'storage_not_configured' }, 503, true);
  const requestedDays = Number(url.searchParams.get('days') || '30');
  const days = Number.isInteger(requestedDays) && requestedDays >= 1 && requestedDays <= 90
    ? requestedDays : 30;
  const cutoff = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10);
  const rows = await env.DB.prepare(
    'SELECT day, site, agent, requests FROM agent_hits WHERE day >= ? ORDER BY day DESC, site, agent'
  ).bind(cutoff).all();
  const breakdown = rows.results ?? [];
  return json({
    metric: 'GET requests to the tracked agent-feed endpoint, classified by claimed User-Agent',
    verified_agent_identity: false,
    time_zone: 'UTC',
    days,
    total_requests: breakdown.reduce((sum, row) => sum + row.requests, 0),
    breakdown,
  }, 200, true);
}

async function serveFeed(request, env, url) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    return new Response('Method Not Allowed', { status: 405, headers: { allow: 'GET, HEAD' } });
  }
  const site = url.searchParams.get('site');
  if (!SITES.has(site)) return json({ error: 'site must be portfolio, store, or knowledge-map' }, 400);
  if (!env.DB) return json({ error: 'storage_not_configured' }, 503);

  // Fail closed for fetching: never return an invented or stale JSON.
  let upstream;
  try {
    upstream = await fetch(FEED_URL, { redirect: 'manual' });
  } catch {
    return json({ error: 'feed_unavailable' }, 502);
  }
  if (!upstream.ok) return json({ error: 'feed_unavailable' }, 502);
  const body = request.method === 'HEAD' ? null : await upstream.text();
  const agent = agentFromUserAgent(request.headers.get('user-agent'));
  if (agent && request.method === 'GET') {
    const day = new Date().toISOString().slice(0, 10);
    try {
      // Atomic UPSERT: no lost increments from concurrent requests.
      await env.DB.prepare(
        'INSERT INTO agent_hits (day, site, agent, requests) VALUES (?, ?, ?, 1) '
        + 'ON CONFLICT(day, site, agent) DO UPDATE SET requests = agent_hits.requests + 1'
      ).bind(day, site, agent).run();
    } catch (error) {
      // Do not block reading the public feed if counting is temporarily unavailable.
      console.error('counter_write_failed');
    }
  }
  return new Response(body, {
    status: 200,
    headers: { ...JSON_HEADERS, 'access-control-allow-origin': '*' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/stats') {
      if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
      try { return await getStatistics(request, env, url); }
      catch { return json({ error: 'stats_unavailable' }, 503, true); }
    }
    if (url.pathname === '/agent-feed.json') return serveFeed(request, env, url);
    return json({ error: 'not_found' }, 404);
  },
};

export { agentFromUserAgent };
