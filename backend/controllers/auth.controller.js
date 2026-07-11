import { signup as signupService, login as loginService } from "../services/auth.service.js";
import { signToken } from "../utils/jwt.js";

export async function signup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "name, email, and password are required" });
    }
    const user = await signupService({ name, email, password });
    const token = signToken({ id: user.id });
    res.status(201).json({ user, token });
}

export async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "email and password are required" });
    }
    const user = await loginService({ email, password });
    const token = signToken({ id: user.id });
    res.status(200).json({ user, token });
}