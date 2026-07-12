import { addUserSkill, getUserSkills } from "../queries/user-skill.queries.js";
import ApiError from '../utils/ApiError.js';

const VALID_INTENTS = ['Teach', 'Learn'];
const VALID_PROFICIENCY = ['Beginner', 'Intermediate', 'Expert'];

export async function addUserSkillController(req, res) {
    const userId = req.user && req.user.id;
    if (!userId) throw new ApiError(401, 'Unauthorized');

    const { skillId, intent, proficiencyLevel, hourlyRate } = req.body;
    if (!skillId || !intent) {
        return res.status(400).json({ error: 'skillId and intent are required' });
    }

    if (!VALID_INTENTS.includes(intent)) {
        return res.status(400).json({ error: `intent must be one of: ${VALID_INTENTS.join(', ')}` });
    }

    if (proficiencyLevel && !VALID_PROFICIENCY.includes(proficiencyLevel)) {
        return res.status(400).json({ error: `proficiencyLevel must be one of: ${VALID_PROFICIENCY.join(', ')}` });
    }

    if (intent === 'Teach' && hourlyRate !== undefined) {
        const rateNum = Number(hourlyRate);
        if (Number.isNaN(rateNum) || rateNum < 0) {
            return res.status(400).json({ error: 'hourlyRate must be a non-negative number' });
        }
    }

    const id = addUserSkill(userId, {
        skillId,
        intent,
        proficiencyLevel,
        hourlyRate: intent === 'Teach' ? (hourlyRate ?? null) : null,
    });

    res.status(201).json({ id });
}

export async function getUserSkillsController(req, res) {
    const userId = (req.user && req.user.id) || req.params.userId;
    if (!userId) throw new ApiError(401, 'Unauthorized');

    const result = getUserSkills(userId);

    let skills = [];
    if (!result) skills = [];
    else if (Array.isArray(result)) skills = result;
    else skills = [result];

    res.status(200).json({ skills });
}