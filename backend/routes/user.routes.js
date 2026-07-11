import express from "express";
import { getMe, updateProfile } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     description: Returns the current authenticated user's profile information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfileResponse'
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/me", requireAuth, asyncHandler(getMe));

/**
 * @openapi
 * /api/users/me:
 *   patch:
 *     summary: Update the authenticated user's profile
 *     description: Allows the currently authenticated user to update their name and social links.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ada Lovelace
 *               socialLinks:
 *                 type: array
 *                 description: Array of social link objects or values accepted by the app
 *                 example:
 *                   - github
 *                   - linkedin
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfileResponse'
 *       400:
 *         description: No valid fields provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/me", requireAuth, asyncHandler(updateProfile));

export default router;