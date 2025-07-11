const userModel = require('../model/userSchema.js');

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
        const { bio, profilePicture, languagesSpoken , languagesToLearn} = req.body;

        if(!bio || !profilePicture || !languagesSpoken || !languagesToLearn) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }else {
            // Update user profile
            user.bio = bio || user.bio;
            user.profilePicture = profilePicture || user.profilePicture;
            user.languagesSpoken.push(...languagesSpoken.filter(lang => !user.languagesSpoken.includes(lang)));
            
            if(languagesToLearn){
               user.languagesToLearn.push(...languagesToLearn.filter(lang => !user.languagesToLearn.includes(lang)));
            }

            await user.save();
            res.status(200).json({ message: "User profile updated successfully", user });
        }


    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
