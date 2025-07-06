CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, email, name, password)
VALUES 
  ('cfbd4926-facf-46a0-aa7b-dacfaaefb3ea','alice@example.com', 'Alice', 'hashedpass1'),
  ('aabd4926-facf-46b0-aa7b-dacfaaefb3ff','bob@example.com', 'Bob', 'hashedpass2');

-- CREATE INDEX idx_users_email ON users(email);