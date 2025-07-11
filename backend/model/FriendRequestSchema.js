const mongoose = require('mongoose');

const FriendsRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
        required:true
    },
}, { timestamps: true });

const FriendRequest = mongoose.model('FriendRequest', FriendsRequestSchema);
module.exports = FriendRequest;