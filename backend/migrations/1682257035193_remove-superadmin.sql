-- Up Migration
CREATE TYPE user_role_new AS ENUM ('normal', 'admin');
UPDATE users SET role = 'admin' WHERE role = 'superadmin';
ALTER TABLE users ALTER COLUMN role DROP DEFAULT;
ALTER TABLE users ALTER COLUMN role TYPE user_role_new USING role::text::user_role_new;
DROP TYPE user_role;
ALTER TYPE user_role_new RENAME TO user_role;
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'normal';

-- Down Migration
