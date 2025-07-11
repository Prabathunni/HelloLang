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

        await newRequest.save();
         res.status(201).json({ message: "Request Send", newRequest })

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });

    }

}


exports.acceptFriendRequest = async (req, res) => {
    console.log("Inside add friend request controller");
    try {
        const request = await FriendRequest.findById(req.params.id);
        console.log(req.params.id);
        
        console.log(request);
        
        if (!request || request.status !== 'pending') {
            return res.status(404).json({ msg: "Invalid or expired request" });
        }

        request.status='accepted';
        res.status(200).json({ msg: "ok",request });

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }


}