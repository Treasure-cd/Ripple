import pool from "../database/db.js";
import ApiError from "../utils/ApiError.js";

export async function createSessionEscrowed({ userSkillId, learnerId, teacherId, scheduledAt, creditsCost }) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const learnerResult = await client.query(
            `SELECT cached_balance FROM users WHERE id = $1 LIMIT 1`,
            [learnerId]
        );
        const learner = learnerResult.rows[0];

        if (!learner || learner.cached_balance < creditsCost) {
            throw new Error("Insufficient credits");
        }

        const sessionResult = await client.query(
            `
                INSERT INTO sessions (user_skill_id, learner_id, teacher_id, scheduled_at, credits_cost)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id
            `,
            [userSkillId, learnerId, teacherId, scheduledAt, creditsCost]
        );
        const sessionId = sessionResult.rows[0].id;

        await client.query(
            `
                INSERT INTO transactions (session_id, sender_id, receiver_id, amount, status)
                VALUES ($1, $2, $3, $4, 'Pending')
            `,
            [sessionId, learnerId, teacherId, creditsCost]
        );

        await client.query(
            `UPDATE users SET cached_balance = cached_balance - $1 WHERE id = $2`,
            [creditsCost, learnerId]
        );

        await client.query("COMMIT");
        return sessionId;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

export async function completeSession(sessionId, requestingUserId) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const sessionResult = await client.query(
            `SELECT * FROM sessions WHERE id = $1 LIMIT 1`,
            [sessionId]
        );
        const session = sessionResult.rows[0];

        if (!session) throw new ApiError(404, "Session not found");
        if (session.teacher_id !== requestingUserId) {
            throw new ApiError(403, "Only the teacher can mark this session complete");
        }
        if (session.status !== 'Pending') {
            throw new ApiError(400, `Cannot complete a session with status ${session.status}`);
        }

        await client.query(
            `UPDATE sessions SET status = 'Completed', completed_at = NOW() WHERE id = $1`,
            [sessionId]
        );

        await client.query(
            `UPDATE transactions SET status = 'Completed' WHERE session_id = $1`,
            [sessionId]
        );

        await client.query(
            `UPDATE users SET cached_balance = cached_balance + $1 WHERE id = $2`,
            [session.credits_cost, session.teacher_id]
        );

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

export async function cancelSession(sessionId, requestingUserId) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const sessionResult = await client.query(
            `SELECT * FROM sessions WHERE id = $1 LIMIT 1`,
            [sessionId]
        );
        const session = sessionResult.rows[0];

        if (!session) throw new ApiError(404, "Session not found");
        if (session.learner_id !== requestingUserId && session.teacher_id !== requestingUserId) {
            throw new ApiError(403, "Only the learner or teacher can cancel this session");
        }
        if (session.status !== 'Pending') {
            throw new ApiError(400, `Cannot cancel a session with status ${session.status}`);
        }

        await client.query(
            `UPDATE sessions SET status = 'Cancelled' WHERE id = $1`,
            [sessionId]
        );

        await client.query(
            `UPDATE transactions SET status = 'Cancelled' WHERE session_id = $1`,
            [sessionId]
        );

        await client.query(
            `UPDATE users SET cached_balance = cached_balance + $1 WHERE id = $2`,
            [session.credits_cost, session.learner_id]
        );

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}