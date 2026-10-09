import pool from "../database/db.js";

export async function addUserSkill(userId, { skillId, intent, proficiencyLevel, hourlyRate }) {
    const rate = intent === 'Teach' ? (hourlyRate ?? 1) : null;

    const result = await pool.query(
        `
            INSERT INTO user_skills (user_id, skill_id, intent, proficiency_level, hourly_rate)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `,
        [userId, skillId, intent, proficiencyLevel ?? null, rate]
    );
    return result.rows[0]?.id ?? null;
}

export async function getUserSkills(userId) {
    const result = await pool.query(
        `SELECT * FROM user_skills WHERE user_id = $1`,
        [userId]
    );
    return result.rows;
}

