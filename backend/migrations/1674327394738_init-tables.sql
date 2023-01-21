-- Up Migration
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password_hash CHAR(60) NOT NULL,
    settings JSON
);

CREATE TABLE projects (
    id UUID PRIMARY KEY,
    user_id UUID,
    name VARCHAR(100) NOT NULL,
    data JSON NOT NULL,

    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
)

-- Down Migration
