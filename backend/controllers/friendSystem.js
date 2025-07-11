const userModel = require('../model/userSchema.js');
const FriendRequest = require('../model/FriendRequestSchema.js');


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

        await newRequest.save();
         res.status(201).json({ message: "Request Send", newRequest })

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });

    }

}

exports.rejectFriendRequest = async (req, res) => {
    console.log("Inside reject friend request controller");
    try {
        const request = await FriendRequest.findById(req.params.id);                
        if (!request || request.status !== 'pending') {
            return res.status(404).json({ msg: "Invalid or expired request" });
        }

        await request.deleteOne();

        res.status(200).json("Request deleted / cancelled");

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }


}

exports.acceptFriendRequest = async (req, res) => {
    console.log("Inside add friend request controller");
    try {
        const request = await FriendRequest.findById(req.params.id);                
        if (!request || request.status !== 'pending') {
            return res.status(404).json({ msg: "Invalid or expired request" });
        }

        request.status='accepted';
        await request.save();

        // add friends to both sender usermodel and reciever user model
        await userModel.findByIdAndUpdate(request.sender, { $push: {friends: request.receiver} })
        await userModel.findByIdAndUpdate(request.receiver, { $push: {friends: request.sender} })

        res.status(200).json("Request Accepted");

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }


}

exports.getAllRequests = async (req,res) => {
    console.log("Inside get all req controller");
    try {
        const user = await userModel.findById(req.userId).populate('friends', 'username profilePicture');
        if(!user) return res.status(404).json("user not found")
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
