-- Up Migration
-- Unhashed password is 'superadmin'
INSERT INTO users (id, name, password_hash, role)
VALUES ('8ed32f81-31c6-488d-aa1a-416ea13e8291', 'superadmin', '$2b$10$In/OFg5exXq3cn69YwQbv.k3vwnr0k/HLYaK7Jj0bTRl1KBbawQY6', 'superadmin');
