const messageModel = require('../model/MessageSchema.js')
const userModel = require('../model/userSchema.js')


exports.getUsersForSideBar = async (req,res) => {
    console.log("Inside get user for side bar controller");
    try {
        const loggedUser = req.userId;
        const users = await userModel.find({_id: {$ne: loggedUser}})
        res.status(200).json(users)
        
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.getUserMessageController = async (req,res) => {
    console.log("Inside get user message controller");
    try {
        
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}