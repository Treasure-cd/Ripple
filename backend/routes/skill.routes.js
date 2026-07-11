import express from 'express'
import { createSkillController, getSkillController, searchSkillController } from '../controllers/skill.controller.js'
import { requireAuth } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * @openapi
 * /api/skills:
 *   get:
 *     summary: List all skills
 *     description: Returns a complete list of skills ordered by name.
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: A list of skill records.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillListResponse'
 *       500:
 *         description: Server error while fetching skills.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', requireAuth, asyncHandler(getSkillController));

/**
 * @openapi
 * /api/skills:
 *   post:
 *     summary: Create a new skill
 *     description: Creates a new skill record with a name and category.
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillCreateRequest'
 *     responses:
 *       201:
 *         description: Skill created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillCreateResponse'
 *       400:
 *         description: Missing or invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error while creating skill.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', requireAuth, asyncHandler(createSkillController));

/**
 * @openapi
 * /api/skills/search:
 *   get:
 *     summary: Search for skills
 *     description: Returns skills matching the provided search term. Search is case-insensitive and matches partial names.
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for finding skills by name.
 *     responses:
 *       200:
 *         description: Search results returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillListResponse'
 *       400:
 *         description: Missing query parameter or invalid search term.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error while searching skills.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search', requireAuth, asyncHandler(searchSkillController));

export default router;
