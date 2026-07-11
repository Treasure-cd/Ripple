import db from "../database/db.js";

export function findUserById(id) {
    const stmt = db.prepare(`
        SELECT id, name, email, cached_balance, social_links, created_at
        FROM users
        WHERE id = ?
    `);
    return stmt.get(id);
}

export function updateUser(id, { name, socialLinks }) {
    const stmt = db.prepare(`
        UPDATE users
        SET name = COALESCE(?, name),
            social_links = COALESCE(?, social_links),
            updated_at = datetime('now')
        WHERE id = ?
    `);
    stmt.run(name ?? null, socialLinks ?? null, id);
}