import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { skills, userSkills } from "../database/schemas/ripple.schema.js";
import {
  createSkill,
  getSkills,
  searchSkill,
} from "../queries/skills.queries.js";
import { type RequestHandler } from "express";

const VALID_CATEGORIES = ["Programming", "Design", "Language"];
const createSkillController: RequestHandler = async (req, res) => {
  const { name, category } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: "Name and category are required" });
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: "Category is invalid. Try one of Programming, Design and Language",
    });
  }

  const id = await createSkill(name, category);
  res.status(201).json({ id });
};

const getSkillController: RequestHandler = async (req, res) => {
  const skills = await getSkills();
  res.status(200).json({ skills });
};

const searchSkillController: RequestHandler = async (req, res) => {
  const searchTerm = req.query.q;

  if (searchTerm === undefined) {
    return res.status(200).json({ skills: [] });
  }

  if (typeof searchTerm !== "string") {
    return res.status(400).json({ error: "must be a string" });
  }

  const trimmed = searchTerm.trim();

  if (!trimmed) {
    return res.status(200).json({ skills: [] });
  }

  const skills = await searchSkill(trimmed);
  return res.status(200).json({ skills });
};

const getSkillDetail: RequestHandler = async (req, res) => {
  const skillId = req.params.id;
  if (skillId === undefined) {
    return res.status(200).json({ skills: [] });
  }

  if (typeof skillId !== "number") {
    return res.status(400).json({ error: "must be a number" });
  }

  const skillDetail = await db
    .select({
      name: skills.name,
      category: skills.category,
      intent: userSkills.intent,
      proficiencyLevel: userSkills.proficiencyLevel,
      hourlyRate: userSkills.hourlyRate,
      verified: userSkills.verified,
    })
    .from(userSkills)
    .innerJoin(skills, eq(skills.id, userSkills.skillId))
    .where(eq(skills.id, skillId));

    return skillDetail
};

export { createSkillController, getSkillController, searchSkillController, getSkillDetail };
