const userModel = require('../model/userSchema.js');
const cloudinary = require('../utils/cloudinary.js')
const fs = require('fs')


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
        let { bio, languagesSpoken, languagesToLearn } = req.body;

        // console.log("Raw data:", languagesSpoken, bio, languagesToLearn);

        if (!bio) {
            return res.status(400).json({ message: "No bio to update" });
        }

        let parsedSpoken = [];
        let parsedLearn = [];

        try {
            parsedSpoken = JSON.parse(languagesSpoken || '[]');
            parsedLearn = JSON.parse(languagesToLearn || '[]');
        } catch (err) {
            return res.status(400).json({ message: 'Invalid JSON format for languages', error: err.message });
        }
        // console.log("After parse:",parsedSpoken,parsedLearn);


        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {

            let imageUrl = null;

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'HelloLang_profiles'
                });
                imageUrl = result.secure_url;
                fs.unlinkSync(req.file.path);
            }

            user.bio = bio || user.bio;
            user.profilePicture = imageUrl || user.profilePicture;
            user.languagesSpoken.push(...parsedSpoken.filter(lang => !user.languagesSpoken.includes(lang)));

            if (languagesToLearn) {
                user.languagesToLearn.push(...parsedLearn.filter(lang => !user.languagesToLearn.includes(lang)));
            }

            await user.save();
            res.status(200).json({ message: "User profile updated successfully", user });
        }


    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
