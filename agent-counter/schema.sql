-- Solo agregados diarios. No se almacenan IP, cookies ni identificadores individuales.
CREATE TABLE IF NOT EXISTS agent_hits (
  day TEXT NOT NULL,
  site TEXT NOT NULL CHECK (site IN ('portfolio', 'store', 'knowledge-map')),
  agent TEXT NOT NULL,
  requests INTEGER NOT NULL DEFAULT 0 CHECK (requests >= 0),
  PRIMARY KEY (day, site, agent)
);
CREATE INDEX IF NOT EXISTS agent_hits_day ON agent_hits(day);
