import db from '../database/db.js'

export function addUserSkill(userId, { skillId, intent, proficiencyLevel, hourlyRate }) {
    const rate = intent === 'Teach' ? (hourlyRate ?? 1) : null;

    const stmt = db.prepare(`
        INSERT INTO user_skills (user_id, skill_id, intent, proficiency_level, hourly_rate)
        VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(userId, skillId, intent, proficiencyLevel ?? null, rate).lastInsertRowid;
}

export function getUserSkills(userId) {
    const stmt = db.prepare(`
            SELECT * FROM user_skills WHERE user_id = ?
        `);
    return stmt.get(userId)
}

