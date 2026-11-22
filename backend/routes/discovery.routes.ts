import express from "express";
import { requireAuth } from "../middleware/authMiddleware";
import asyncHandler from "../middleware/asyncHandler";
import getTeachers from "../controllers/discovery.controller";

const router = express.Router();

router.get("/teacher", requireAuth, asyncHandler(getTeachers))

export default router;