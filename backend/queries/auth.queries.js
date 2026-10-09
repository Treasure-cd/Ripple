import pool from "../database/db.js";

export async function createUser({ name, email, passwordHash }) {
    const result = await pool.query(
        `
            INSERT INTO users (name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id
        `,
        [name, email, passwordHash]
    );
    return result.rows[0]?.id ?? null;
}

export async function findUserByEmail(email) {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1 LIMIT 1`,
        [email]
    );
    return result.rows[0] ?? null;
}

export async function findUserById(id) {
    const result = await pool.query(
        `
            SELECT id, name, email, cached_balance, social_links, created_at
            FROM users
            WHERE id = $1
            LIMIT 1
        `,
        [id]
    );
    return result.rows[0] ?? null;
}