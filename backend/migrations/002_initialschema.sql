CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    tmdb_id INTEGER UNIQUE,
    title VARCHAR(255) NOT NULL,
    release_year INTEGER,
    poster_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    movie_id INTEGER NOT NULL REFERENCES movies(id),
    rating INTEGER,
    text TEXT,
    watched_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE list_items (
    id SERIAL PRIMARY KEY,
    list_id INTEGER NOT NULL REFERENCES lists(id),
    movie_id INTEGER NOT NULL REFERENCES movies(id),
    position INTEGER
);