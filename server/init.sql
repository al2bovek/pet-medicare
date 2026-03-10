CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    user_name     TEXT NOT NULL UNIQUE,
    email         TEXT NOT NULL UNIQUE,
    password      TEXT NOT NULL,
    role          TEXT NOT NULL DEFAULT 'client',
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    refresh_token TEXT
);

CREATE TABLE IF NOT EXISTS appointments (
    id               SERIAL PRIMARY KEY,
    user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_name         TEXT NOT NULL,
    owner_name       TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    notes            TEXT
);
