import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import { createUser, findUserByEmail } from "../queries/auth.queries.js";

const SALT_ROUNDS = 10;

export async function signup({ name, email, password }) {
    const existing = await findUserByEmail(email);
    if (existing) {
        throw new ApiError(409, "Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await createUser({ name, email, passwordHash });

    return { id: userId, name, email };
}

export async function login({ email, password }) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        throw new ApiError(401, "Invalid credentials");
    }

    return { id: user.id, name: user.name, email: user.email };
}