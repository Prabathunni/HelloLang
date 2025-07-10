const userModel = require('../model/userSchema');

exports.getUserProfile = async (req, res) => {
    console.log("inside getUserProfile controller");

    const userId = req.params.id;
    try {
        // Fetch user profile from database
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.updateUserProfile = async (req, res) => {
    console.log("inside updateUserProfile controller");

    try {

        const userId = req.params.id;
        const { bio, profilePicture } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }else {
            // Update user profile
            user.bio = bio || user.bio;
            user.profilePicture = profilePicture || user.profilePicture;

            await user.save();
            res.status(200).json({ message: "User profile updated successfully", user });
        }


    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
