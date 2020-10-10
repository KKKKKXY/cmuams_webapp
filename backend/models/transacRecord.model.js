const mongoose = require('mongoose');

// Exercise schema
const transactionSchema = new mongoose.Schema(
    {
        from: {
            type: String
        },
        to: {
            type: String
        },
        amount: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);
