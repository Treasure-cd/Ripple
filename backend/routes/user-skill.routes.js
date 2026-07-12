import express from 'express';
import { addUserSkillController, getUserSkillsController } from "../controllers/user-skill.controller.js";
import { requireAuth } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * @openapi
 * /api/users/me/skills:
 *   post:
 *     summary: Add a skill for the authenticated user
 *     description: Adds a skill to the current user's profile. When `intent` is `Teach`, `hourlyRate` may be provided.
 *     tags: [UserSkills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [skillId, intent]
 *             properties:
 *               skillId:
 *                 type: integer
 *                 example: 1
 *               intent:
 *                 type: string
 *                 description: 'One of Teach or Learn'
 *                 example: Teach
 *               proficiencyLevel:
 *                 type: string
 *                 description: 'One of Beginner, Intermediate, Expert'
 *                 example: Intermediate
 *               hourlyRate:
 *                 type: number
 *                 example: 20
 *     responses:
 *       201:
 *         description: User-skill relationship created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Validation error for provided fields.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', requireAuth, asyncHandler(addUserSkillController));

/**
 * @openapi
 * /api/users/me/skills:
 *   get:
 *     summary: Get skills for the authenticated user
 *     description: Returns a list of the current user's skills and related metadata.
 *     tags: [UserSkills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the user's skills.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *                       skill_id:
 *                         type: integer
 *                         example: 2
 *                       intent:
 *                         type: string
 *                         example: Teach
 *                       proficiency_level:
 *                         type: string
 *                         example: Intermediate
 *                       hourly_rate:
 *                         type: number
 *                         nullable: true
 *                         example: 20
 *       401:
 *         description: Authentication required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', requireAuth, asyncHandler(getUserSkillsController));

export default router;