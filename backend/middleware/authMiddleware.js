import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyToken(token);
        req.user = { id: payload.id };
        next();
    } catch {
        throw new ApiError(401, "Invalid or expired token");
    }
}