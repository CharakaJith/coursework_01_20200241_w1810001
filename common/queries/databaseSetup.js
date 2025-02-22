module.exports = {
  QUERIES: {
    CREATE_USERS: `CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL, -- Hashed password
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    CREATE_API_KEYS: `CREATE TABLE IF NOT EXISTS api_keys (
        key_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        api_key TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME NULL,
        status TEXT DEFAULT 'active' CHECK(status IN ('active', 'revoked')),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );`,

    CREATE_API_REQUESTS: `CREATE TABLE IF NOT EXISTS api_requests (
        request_id INTEGER PRIMARY KEY AUTOINCREMENT,
        key_id INTEGER NOT NULL,
        endpoint TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        status_code INTEGER NOT NULL,
        FOREIGN KEY (key_id) REFERENCES api_keys(key_id) ON DELETE CASCADE
    );`,

    CREATE_COUNTRIES: `CREATE TABLE IF NOT EXISTS countries (
        country_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        capital TEXT NOT NULL,
        currency TEXT NOT NULL,
        languages TEXT NOT NULL, -- Comma-separated values
        flag_url TEXT NOT NULL,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
  },
};
