import { createSkill, getSkills, searchSkill } from "../queries/skills.queries.js";

const VALID_CATEGORIES = ['Programming', 'Design', 'Language']
const createSkillController = async (req, res) => {
    const { name, category } = req.body;
    if (!name || !category) {
        return res.status(400).json({ error: "Name and category are required" });
    }


    if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({ error: "Category is invalid. Try one of Programming, Design and Language" });
    }

    const id = createSkill(name, category);
    res.status(201).json({ id });
};

const getSkillController = async (req, res) => {
    const skills = getSkills();
    res.status(200).json({ skills });
};

const searchSkillController = async (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm || searchTerm.trim() === '') {
        return res.status(200).json({ skills: [] });
    }

    const skills = searchSkill(searchTerm);
    res.status(200).json({ skills });
}

export { createSkillController, getSkillController, searchSkillController };