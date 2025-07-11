const userModel = require('../model/userSchema');
const FriendRequest = require('../model/FriendRequestSchema');


exports.sendFriendRequest = async (req, res) => {
    console.log("inside sendFriendRequest controller");

    try {
        const { receiver } = req.body;
        const sender = req.userId; // from jwt middleware

        const existingRequest = await FriendRequest.findOne({ sender, receiver })
        if (existingRequest) return res.status(400).json({ msg: "Request Already sent" });
        const newRequest = new FriendRequest({
            sender,
            receiver,
        })

        return res.status(201).json({ message: "Request Send", newRequest })


    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });

    }

}
