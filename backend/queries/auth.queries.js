import db from "../database/db.js";

export function createUser({ name, email, passwordHash }) {
    const stmt = db.prepare(`
        INSERT INTO users (name, email, password_hash)
        VALUES (?, ?, ?)
    `);
    const info = stmt.run(name, email, passwordHash);
    return info.lastInsertRowid;
}

export function findUserByEmail(email) {
    const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
    return stmt.get(email);
}

export function findUserById(id) {
    const stmt = db.prepare(`
        SELECT id, name, email, cached_balance, social_links, created_at
        FROM users
        WHERE id = ?
    `);
    return stmt.get(id);
}