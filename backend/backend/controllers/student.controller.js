const Activity = require('../models/activity.model');
const User = require('../models/auth.model');
const { validationResult } = require('express-validator');

exports.enrollActivityController = (req, res) => {
    const activityId = req.params.activityId;
    const userId = req.params.userId;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        console.log(activityId)
        Activity.findById(activityId).exec((err, activity) => {
            if (err || !activity) {
                return res.status(400).json({
                    error: 'Activity not found'
                });
            } else {
                User.findById(userId).exec((err, user) => {
                    if (err || !user) {
                        return res.status(400).json({
                            error: 'User not found'
                        });
                    } else {
                        console.log(user);
                        console.log(user.enrolled);
                        user.enrolled.push(activity)
                        user.save()
                        return res.json({
                            success: true,
                            message: 'Student enrolled activity Successfully',
                            activity
                        });
                    }
                });
            }
        });
    }
};