import {
    findUserById,
    updateUserName,
    updateUserSocialLinks,
} from "../queries/users.queries.js";
import ApiError from "../utils/ApiError.js";

export async function getMe(req, res) {
    const user = await findUserById(req.user.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json({
        user: {
            ...user,
            cached_balance: user.cached_balance ?? 0,
            social_links: user.social_links ?? [],
        },
    });
}

export async function updateProfile(req, res) {
    const body = req.body ?? {};
    const { name } = body;
    const socialLinks = body.socialLinks ?? body.social_links;
    const shouldUpdateName = name !== undefined;
    const shouldUpdateSocialLinks =
        body.socialLinks !== undefined || body.social_links !== undefined;

    if (!shouldUpdateName && !shouldUpdateSocialLinks) {
        return res.status(400).json({ error: "No valid fields provided for update." });
    }

    if (shouldUpdateName) {
        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ error: "name must be a non-empty string." });
        }
        await updateUserName(req.user.id, name.trim());
    }

    if (shouldUpdateSocialLinks) {
        if (
            !Array.isArray(socialLinks) ||
            !socialLinks.every(
                (link) =>
                    typeof link === "string" &&
                    isHttpUrl(link),
            )
        ) {
            return res.status(400).json({
                error: "socialLinks must be an array of HTTP or HTTPS URLs.",
            });
        }
        await updateUserSocialLinks(req.user.id, socialLinks);
    }

    const updatedUser = await findUserById(req.user.id);
    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json({
        user: {
            ...updatedUser,
            cached_balance: updatedUser.cached_balance ?? 0,
            social_links: updatedUser.social_links ?? [],
        },
    });
}

function isHttpUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}