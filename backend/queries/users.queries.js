import {pool} from "../database/db.js";

export async function findUserById(id) {
    const result = await pool.query(
        `
            SELECT
                "user".id,
                "user".name,
                "user".email,
                "user"."createdAt" AS created_at,
                profiles.cached_balance,
                profiles.social_links
            FROM "user"
            LEFT JOIN profiles ON profiles.user_id = "user".id
            WHERE "user".id = $1
            LIMIT 1
        `,
        [id]
    );
    return result.rows[0] ?? null;
}

export async function updateUserName(id, name) {
    await pool.query(
        `
            UPDATE "user"
            SET name = $1,
                "updatedAt" = NOW()
            WHERE id = $2
        `,
        [name, id]
    );
}

export async function updateUserSocialLinks(id, socialLinks) {
    await pool.query(
        `
            INSERT INTO profiles (user_id, social_links)
            VALUES ($1, $2::jsonb)
            ON CONFLICT (user_id)
            DO UPDATE SET social_links = EXCLUDED.social_links
        `,
        [id, JSON.stringify(socialLinks)]
    );
}