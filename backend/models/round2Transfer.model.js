const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

// Exercise schema
const SecondRoundSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now(),
            required: true
        }
    },
    {
        timestamps: true
    }
);
SecondRoundSchema.plugin(mongooseDateFormat); 


module.exports = mongoose.model('SecondRound', SecondRoundSchema);
