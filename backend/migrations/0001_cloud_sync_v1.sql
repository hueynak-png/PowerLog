CREATE TABLE IF NOT EXISTS sync_keys (
  id TEXT PRIMARY KEY,
  key_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  last_used_at TEXT,
  revoked_at TEXT
);

CREATE TABLE IF NOT EXISTS snapshot_manifests (
  id TEXT PRIMARY KEY,
  sync_key_id TEXT NOT NULL,
  r2_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  sha256 TEXT NOT NULL,
  schema_version INTEGER NOT NULL,
  app_version TEXT,
  platform TEXT,
  client_id TEXT,
  FOREIGN KEY (sync_key_id) REFERENCES sync_keys(id)
);

CREATE INDEX IF NOT EXISTS idx_snapshot_manifests_sync_key_created
ON snapshot_manifests(sync_key_id, created_at DESC);
