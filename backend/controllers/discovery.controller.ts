import { getTeachersForSkill } from "../queries/feed.queries";
import { type RequestHandler } from "express";

const getTeachers: RequestHandler = async (req, res) => {
  const skillId = req.query.teachers;
  if (!skillId) {
    return res.status(400).json({ error: "id is required" });
  }
  const teachers = await getTeachersForSkill(skillId)
  res.status(200).json({ teachers });
};

export default getTeachers