import ApiError from "../utils/ApiError.js";
import { auth } from "../database/auth.js";

export async function requireAuth(req, res, next) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
        throw new ApiError(401, "Missing or invalid session");
    }

    req.user = session.user;
    next();
}