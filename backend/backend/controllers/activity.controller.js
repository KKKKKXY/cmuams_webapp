const Activity = require('../models/activity.model');
const { validationResult } = require('express-validator');
const { errorHandler } = require('../helpers/dbErrorHandling');

exports.readActivityController = (req, res) => {
    const activityId = req.params.id;
    Activity.findById(activityId).exec((err, activity) => {
        if (err || !activity) {
            return res.status(400).json({
                error: 'Activity not found'
            });
        }
        const { _id, activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant } = activity;
        return res.json({
            activity: {
                _id,
                activityName,
                description,
                startDate,
                bidEndDate,
                location,
                responsiblePerson,
                phoneNo,
                limitParticipant
            }
        });
    });
};

exports.listActivityController = (req, res) => {
    Activity.find().exec((err, activity) => {
        if (err || !activity || activity == "") {
            return res.status(400).json({
                error: 'Activities not found'
            });
        }
        res.json(activity);
    });
};

exports.addActivityController = (req, res) => {
    const { activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant } = req.body;
    const errors = validationResult(req);
    const activity = new Activity({
        activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant
    });

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
    activity.save((err, activity) => {
        if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
                errors: errorHandler(err)
            });
        } else {
            return res.json({
                success: true,
                message: 'Activity Added Successfully',
                activity
            });
        }
    });
    }
};

exports.deleteActivityController = (req, res) => {
    const activityId = req.params.id;
    Activity.findByIdAndDelete(activityId).exec((err, activity) => {
        if (err || !activity) {
            return res.status(400).json({
                error: 'The activity not found'
            });
        }
        return res.json({
            success: true,
            message: 'Activity deleted!'
        });
    });
};

exports.editActivityController = (req, res) => {
    const { activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant } = req.body;
    const activityId = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        Activity.findById(activityId).exec((err, activity) => {
            if (err || !activity) {
                return res.status(400).json({
                    error: 'The activity not found'
                });
            }
            else {
                activity.activityName = activityName;
                activity.description = description;
                activity.startDate = startDate;
                activity.bidEndDate = bidEndDate;
                activity.location = location;
                activity.responsiblePerson = responsiblePerson;
                activity.phoneNo = phoneNo;
                activity.limitParticipant = limitParticipant;
            }
            activity.save((err, editedActivity) => {
                if (err) {
                    console.log('Activity Eidt ERROR', err);
                    return res.status(400).json({
                        error: 'Activity eidt failed'
                    });
                }
                res.json({
                    message: `Activity Edited Successfully!`
                });
            });
        });
    }
};