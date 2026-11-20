import pool from "../database/db.js";

export async function getTeachersForSkill(skillId) {
    const result = await pool.query(
        `
            SELECT
                user_skills.id AS user_skill_id,
                "user".id AS user_id,
                "user".name,
                skills.name AS skill_name,
                user_skills.proficiency_level,
                user_skills.hourly_rate,
                user_skills.verified
            FROM user_skills
            JOIN "user" ON "user".id = user_skills.user_id
            JOIN skills ON skills.id = user_skills.skill_id
            WHERE user_skills.skill_id = $1
              AND user_skills.intent = 'Teach'
              AND user_skills.hourly_rate IS NOT NULL
        `,
        [skillId]
    );
    return result.rows;
}

export async function getUserSkillDetail(userSkillId) {
    const result = await pool.query(
        `
            SELECT
                user_skills.id AS user_skill_id,
                "user".id AS user_id,
                "user".name,
                profiles.social_links,
                skills.name AS skill_name,
                skills.category,
                user_skills.proficiency_level,
                user_skills.hourly_rate,
                user_skills.verified
            FROM user_skills
            JOIN "user" ON "user".id = user_skills.user_id
            LEFT JOIN profiles ON profiles.user_id = "user".id
            JOIN skills ON skills.id = user_skills.skill_id
            WHERE user_skills.id = $1
            LIMIT 1
        `,
        [userSkillId]
    );
    return result.rows[0] ?? null;
}