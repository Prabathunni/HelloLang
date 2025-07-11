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
        const userToChat = req.params.id;
        const myId = req.userId;

        const messages = await messageModel.find({
            $or:[
                {sender: myId, receiver: userToChat},
                {sender:userToChat, receiver:myId}
            ]
        })

        if(messages.length==0) return res.status(200).json("No messages yet")

        res.status(200).json(messages)

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.sendMessageToUserController = async (req,res) => {
    console.log("Inside send message controller");
    try {
        const { text } = req.body;
        const receiver = req.params.id;
        const sender = req.userId;

        let imageUrl = null;

        if(req.file){
            imageUrl = req.file.path; //cloudinary url
        }

        const message = new messageModel({
            sender,
            receiver,
            text,
            image: imageUrl,
        })
        
        await message.save();

        // todo: socket.io setup here for later after frontend setup

        res.status(201).json("Message sent")

        
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}