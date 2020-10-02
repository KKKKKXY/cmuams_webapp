const mongoose = require('mongoose');

// Exercise schema
const transferSchema = new mongoose.Schema(
    {
        senderEmail: {
            type: String,
            required: true
        },
        recipientEmail: {
            type: String,
            required: true
        },
        transferDate: {
            type: Date,
            default: Date.now(),
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transfer', transferSchema);
