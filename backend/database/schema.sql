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

INSERT INTO users (email, name, password)
VALUES 
  ('alice@example.com', 'Alice', 'hashedpass1'),
  ('bob@example.com', 'Bob', 'hashedpass2'),
  ('carol@example.com', 'Carol', 'hashedpass3'),
  ('dave@example.com', 'Dave', 'hashedpass4'),
  ('eve@example.com', 'Eve', 'hashedpass5');

-- CREATE INDEX idx_users_email ON users(email);