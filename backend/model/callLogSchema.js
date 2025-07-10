const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
    caller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startedAt: {
        type: Date, 
        default: Date.now
    },
    endedAt: {
        type: Date
    },
    status: {
        type: String,   
        enum: ['rejected', 'completed', 'missed'],
        default: 'rejected'
    }
}, { timestamps: true });

const CallLog = mongoose.model('CallLog', callLogSchema);
module.exports = CallLog;