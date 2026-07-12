import db from "../db.js";

export function createSessionEscrowed({ userSkillId, learnerId, teacherId, scheduledAt, creditsCost }) {
    const run = db.transaction(() => {
        const learner = db.prepare(`SELECT cached_balance FROM users WHERE id = ?`).get(learnerId);
        if (!learner || learner.cached_balance < creditsCost) {
            throw new Error("Insufficient credits");
        }

        const sessionInfo = db.prepare(`
            INSERT INTO sessions (user_skill_id, learner_id, teacher_id, scheduled_at, credits_cost)
            VALUES (?, ?, ?, ?, ?)
        `).run(userSkillId, learnerId, teacherId, scheduledAt, creditsCost);

        db.prepare(`
            INSERT INTO transactions (session_id, sender_id, receiver_id, amount, status)
            VALUES (?, ?, ?, ?, 'Pending')
        `).run(sessionInfo.lastInsertRowid, learnerId, teacherId, creditsCost);

        db.prepare(`
            UPDATE users SET cached_balance = cached_balance - ? WHERE id = ?
        `).run(creditsCost, learnerId);

        return sessionInfo.lastInsertRowid;
    });

    return run();
}

export function completeSession(sessionId, requestingUserId) {
    const run = db.transaction(() => {
        const session = db.prepare(`SELECT * FROM sessions WHERE id = ?`).get(sessionId);

        if (!session) throw new ApiError(404, "Session not found");
        if (session.teacher_id !== requestingUserId) {
            throw new ApiError(403, "Only the teacher can mark this session complete");
        }
        if (session.status !== 'Pending') {
            throw new ApiError(400, `Cannot complete a session with status ${session.status}`);
        }

        db.prepare(`
            UPDATE sessions SET status = 'Completed', completed_at = datetime('now') WHERE id = ?
        `).run(sessionId);

        db.prepare(`
            UPDATE transactions SET status = 'Completed' WHERE session_id = ?
        `).run(sessionId);

        db.prepare(`
            UPDATE users SET cached_balance = cached_balance + ? WHERE id = ?
        `).run(session.credits_cost, session.teacher_id);
    });

    run();
}


export function cancelSession(sessionId, requestingUserId) {
    const run = db.transaction(() => {
        const session = db.prepare(`SELECT * FROM sessions WHERE id = ?`).get(sessionId);

        if (!session) throw new ApiError(404, "Session not found");
        if (session.learner_id !== requestingUserId && session.teacher_id !== requestingUserId) {
            throw new ApiError(403, "Only the learner or teacher can cancel this session");
        }
        if (session.status !== 'Pending') {
            throw new ApiError(400, `Cannot cancel a session with status ${session.status}`);
        }

        db.prepare(`
            UPDATE sessions SET status = 'Cancelled' WHERE id = ?
        `).run(sessionId);

        db.prepare(`
            UPDATE transactions SET status = 'Cancelled' WHERE session_id = ?
        `).run(sessionId);

        db.prepare(`
            UPDATE users SET cached_balance = cached_balance + ? WHERE id = ?
        `).run(session.credits_cost, session.learner_id);
    });

    run();
}