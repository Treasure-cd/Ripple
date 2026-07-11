import db from '../database/db.js'

export function getSkills() {
    const stmt = db.prepare(`SELECT * FROM skills ORDER BY name`);
    return stmt.all();
}

export function createSkill(name, category) {
    const stmt = db.prepare(`INSERT INTO skills (name, category) VALUES (?, ?)`)
    const info = stmt.run(name, category)
    return info.lastInsertRowid;
}

export function searchSkill(searchTerm) {
    const wildcardQuery = `%${searchTerm.trim().toLowerCase()}%`;
    const stmt = db.prepare(`
        SELECT id, name, category
        FROM skills
        WHERE LOWER(name) LIKE ?
        ORDER BY name
        LIMIT 10
    `);
    return stmt.all(wildcardQuery);
}
