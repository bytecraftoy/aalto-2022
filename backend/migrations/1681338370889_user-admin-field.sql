-- Up Migration
CREATE TYPE user_role AS ENUM ('normal', 'admin', 'superadmin');
ALTER TABLE users ADD COLUMN role user_role NOT NULL DEFAULT 'normal';

-- Down Migration
