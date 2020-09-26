const mongoose = require('mongoose');

// Exercise schema
const activitySchema = new mongoose.Schema(
    {
        activityName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        bidEndDate: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        responsiblePerson: {
            type: String,
            default: ''
        },
        phoneNo: {
            type: String,
            default: ''
        },
        limitParticipant: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Activity', activitySchema);
