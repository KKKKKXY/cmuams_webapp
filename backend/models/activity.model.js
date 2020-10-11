const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

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
        activityDate: {
            type: Date,
            required: true
        },
        bidDate: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        responsiblePerson: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        seats: {
            type: Number,
            required: true
        },
        creator: {
            type: String,
            required: true
        },
        students: {
            type: Array
        }
    },
    {
        timestamps: true
    }
);
activitySchema.plugin(mongooseDateFormat); 

module.exports = mongoose.model('Activity', activitySchema);
