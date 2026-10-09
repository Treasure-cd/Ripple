import pool from "../database/db.js";


export async function findUserById(id) {
    const result = await pool.query(
        `
            SELECT id, name, email, created_at
            FROM users
            WHERE id = $1
            LIMIT 1
        `,
        [id]
    );
    return result.rows[0] ?? null;
}

export async function findUserProfileById(id) {
    const result = await pool.query(
        `
            SELECT id, cached_balance, social_links
            FROM profile
            WHERE id = $1
            LIMIT 1
        `,
        [id]
    );
    return result.rows[0] ?? null;
}

export async function updateUser(id, { name }) {
    await pool.query(
        `
            UPDATE user
            SET name = COALESCE($1, name),
                updated_at = NOW()
            WHERE id = $2
        `,
        [name ?? null, id]
    );
}

export async function updateUser(id, { socialLinks }) {
    await pool.query(
        `
            UPDATE profile
            SET social_links = COALESCE($2, social_links),
            WHERE id = $2
        `,
        [socialLinks ?? null, id]
    );
}