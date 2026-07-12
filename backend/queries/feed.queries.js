import db from '../database/db'

export function getTeachersForSkill(skillId) {
    const stmt = db.prepare(`
        SELECT
            user_skills.id AS user_skill_id,
            users.id AS user_id,
            users.name,
            skills.name AS skill_name,
            user_skills.proficiency_level,
            user_skills.hourly_rate,
            user_skills.verified
        FROM user_skills
        JOIN users ON users.id = user_skills.user_id
        JOIN skills ON skills.id = user_skills.skill_id
        WHERE user_skills.skill_id = ?
          AND user_skills.intent = 'Teach'
          AND user_skills.hourly_rate IS NOT NULL
    `);
    return stmt.all(skillId);
}



export function getUserSkillDetail(userSkillId) {
    const stmt = db.prepare(`
        SELECT
            user_skills.id AS user_skill_id,
            users.id AS user_id,
            users.name,
            users.social_links,
            skills.name AS skill_name,
            skills.category,
            user_skills.proficiency_level,
            user_skills.hourly_rate,
            user_skills.verified
        FROM user_skills
        JOIN users ON users.id = user_skills.user_id
        JOIN skills ON skills.id = user_skills.skill_id
        WHERE user_skills.id = ?
    `);
    return stmt.get(userSkillId);
}