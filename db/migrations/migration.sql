CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS collections (
  id SERIAL PRIMARY KEY,
  user_id INTEGER
    CONSTRAINT user_id_to_id
      REFERENCES users,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS saves (
  id SERIAL PRIMARY KEY,
  drink_id INTEGER,
  collection_id INTEGER
    CONSTRAINT save
      REFERENCES collections
)