CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS users;

CREATE TABLE  users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE  votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fighter VARCHAR(15) NOT NULL,
    location VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO users (id, email, name, password)
VALUES 
  ('aabd4926-facf-46b0-aa7b-dacfaaefb3ff','john.doe@example.com', 'Jhon Doe', '$2b$12$4Fbx9Bu8JA3a6gGUTs/nDudGtKETH3ktM24I.5lpa80UYacUCa3E2');

INSERT INTO votes (user_id, fighter, location) 
VALUES
  ('aabd4926-facf-46b0-aa7b-dacfaaefb3ff', 'JHdelaCruz', 'CO'),
  ('aabd4926-facf-46b0-aa7b-dacfaaefb3ff', 'May', 'CO')

-- CREATE INDEX idx_users_email ON users(email);