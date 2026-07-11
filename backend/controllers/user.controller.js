import { findUserById, updateUser } from "../queries/users.queries.js";
import ApiError from "../utils/ApiError.js";

export async function getMe(req, res) {
    const user = findUserById(req.user.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    // const skills = getUserSkills(user.id);
    // const ratingSummary = getUserRatingSummary(user.id);

    res.status(200).json({
        user: { ...user, social_links: JSON.parse(user.social_links) }
    });
}

export async function updateProfile(req, res) {
    const updates = {};
    if (req.body.name !== undefined) {
        updates.name = req.body.name;
    }
    if (req.body.socialLinks !== undefined) {
        updates.socialLinks = req.body.socialLinks ? JSON.stringify(req.body.socialLinks) : null;
    }
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No valid fields provided for update." });
    }
    updateUser(req.user.id, updates);
    const updatedUser = findUserById(req.user.id);
    
    res.status(200).json({
        user: { 
            ...updatedUser, 
            social_links: updatedUser.social_links ? JSON.parse(updatedUser.social_links) : null 
        }
    });
}