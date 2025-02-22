module.exports = {
  USER_QUERIES: {
    INSERT: `INSERT INTO users (first_name, last_name, email, password) 
             VALUES (?, ?, ?, ?)`,

    GET_BY_ID: `SELECT * 
                FROM users 
                WHERE user_id = ?`,

    GET_BY_EMAIL: `SELECT *
                   FROM users
                   WHERE email = ?`,
  },
};
