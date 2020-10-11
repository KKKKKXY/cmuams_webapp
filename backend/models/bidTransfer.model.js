const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

// Exercise schema
const BidTransferSchema = new mongoose.Schema(
    {
        student: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        transferDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);
BidTransferSchema.plugin(mongooseDateFormat); 

module.exports = mongoose.model('BidTransfer', BidTransferSchema);
