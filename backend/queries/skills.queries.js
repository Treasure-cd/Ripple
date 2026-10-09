import pool from "../database/db.js";

export async function getSkills() {
    const result = await pool.query(`SELECT * FROM skills ORDER BY name`);
    return result.rows;
}

export async function createSkill(name, category) {
    const result = await pool.query(
        `INSERT INTO skills (name, category) VALUES ($1, $2) RETURNING id`,
        [name, category]
    );
    return result.rows[0]?.id ?? null;
}

export async function searchSkill(searchTerm) {
    const wildcardQuery = `%${searchTerm.trim().toLowerCase()}%`;
    const result = await pool.query(
        `
            SELECT id, name, category
            FROM skills
            WHERE LOWER(name) LIKE $1
            ORDER BY name
            LIMIT 10
        `,
        [wildcardQuery]
    );
    return result.rows;
}
