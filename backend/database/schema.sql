CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- DROP TABLE IF EXISTS votes;
-- DROP TABLE IF EXISTS messages;
-- DROP TABLE IF EXISTS users;

-- CREATE TABLE  users (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     email VARCHAR(255) UNIQUE NOT NULL,
--     name VARCHAR(15) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     location VARCHAR(6),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE  votes (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     fighter VARCHAR(15) NOT NULL,
--     location VARCHAR(6) NOT NULL,
--     is_foreign boolean NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     CONSTRAINT unique_user_fighter_vote UNIQUE (user_id, fighter)
-- );

-- CREATE TABLE messages (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   content VARCHAR(280) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );



-- INSERT INTO users (id, email, name, password)
-- VALUES 
--   ('aabd4926-facf-46b0-aa7b-dacfaaefb3ff','john.doe@example.com', 'JhonDoe', '$2b$12$4Fbx9Bu8JA3a6gGUTs/nDudGtKETH3ktM24I.5lpa80UYacUCa3E2'),
--   ('2b44261c-c689-4b0e-b335-27b0e08455af','camile@mail.com', 'Camile', '$2b$12$dzOAiuM02nhKfS.7vRW.e.y4ZY6B9JGsKPoD0wC8xZbQbB85f7IdS'),
--   ('9d0950c5-deae-40c5-8573-96937fd004d4','michael@mail.com', 'Michael', '$2b$12$vmYorYmod.kxNKydfxQzFu95HxhGKvinakqJmvjyoYhK0FyTM9VQ6');

-- INSERT INTO votes (user_id, fighter, location, is_foreign)
-- VALUES
--   ('aabd4926-facf-46b0-aa7b-dacfaaefb3ff', 'JHdelaCruz', 'CO-ANT', false),
--   ('2b44261c-c689-4b0e-b335-27b0e08455af', 'JHdelaCruz', 'CO-ANT', false),
--   ('9d0950c5-deae-40c5-8573-96937fd004d4', 'JHdelaCruz', 'VE', true),
--   ('aabd4926-facf-46b0-aa7b-dacfaaefb3ff', 'May', 'CO-ANT', false),
--   ('2b44261c-c689-4b0e-b335-27b0e08455af', 'Karina', 'AR', true),
--   ('2b44261c-c689-4b0e-b335-27b0e08455af', 'Shelao', 'FR', true),
--   ('2b44261c-c689-4b0e-b335-27b0e08455af', 'LaValdiri', 'CO-CES', false);


-- CREATE INDEX idx_users_email ON users(email);