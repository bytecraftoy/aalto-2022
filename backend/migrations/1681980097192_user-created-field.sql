-- Up Migration
ALTER TABLE users ADD COLUMN created TIMESTAMP NOT NULL DEFAULT NOW();

-- Down Migration
