import { findUserById, findUserProfileById, updateUser } from "../queries/users.queries.js";
import ApiError from "../utils/ApiError.js";

export async function getMe(req, res) {
    const u = req.user.id
    const user = await findUserById(u);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const profile = await findUserProfileById(u)
    // const skills = getUserSkills(user.id);
    // const ratingSummary = getUserRatingSummary(user.id);

    res.status(200).json({
        user: { ...user, 
                profile: profile.cached_balance, 
                social_links: profile.social_links ? JSON.parse(user.social_links) : null
            }
    });
}

export async function updateProfile(req, res) {
    const nameUpdate = {};
    const profileUpdate = {};

    if (req.body.name !== undefined) {
        nameUpdate.name = req.body.name;
    }
    if (req.body.socialLinks !== undefined) {
        profileUpdates.socialLinks = req.body.socialLinks ? JSON.stringify(req.body.socialLinks) : null;
    }
    if (Object.keys(nameUpdate).length === 0 || Object.keys(profileUpdate).length === 0) {
        return res.status(400).json({ error: "No valid fields provided for update." });
    }

    if (!Object.keys(nameUpdate).length === 0) {
       await updateUser(req.user.id, nameUpdate); 
    }

    if (!Object.keys(profileUpdate).length === 0) {
       await updateProfile(req.user.id, profileUpdate); 
    }
    
    const updatedUser = await findUserById(req.user.id);
    
    res.status(200).json({
        user: {
            ...updatedUser, 
            social_links: updatedUser.social_links ? JSON.parse(updatedUser.social_links) : null 
        }
    });
}