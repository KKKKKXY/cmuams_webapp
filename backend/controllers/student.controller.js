// const Activity = require('../models/activity.model');
// const User = require('../models/auth.model');
// const { validationResult } = require('express-validator');

// exports.enrollActivityController = (req, res) => {
//     const activityId = req.params.id;
//     const { activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const firstError = errors.array().map(error => error.msg)[0];
//         return res.status(422).json({
//             error: firstError
//         });
//     } else {
//         User.findById({ _id: '5f2922a1a7d50c04ca6c0aa8' }).exec((err, user) => {
//             if (err || !user) {
//                 return res.status(400).json({
//                     error: 'User not found'
//                 });
//             } else {
//                 Activity.findOne(activityId).exec((err, activity) => {
//                     if (err || !activity) {
//                         return res.status(400).json({
//                             error: 'Activity not found'
//                         });
//                     } else {
//                         // console.log(activityName);
//                         activity.activityName = activityName;
//                         activity.description = description;
//                         activity.startDate = startDate;
//                         activity.bidEndDate = bidEndDate;
//                         activity.location = location;
//                         activity.responsiblePerson = responsiblePerson;
//                         activity.phoneNo = phoneNo;
//                         activity.limitParticipant = limitParticipant;

//                         activity.save();
//                         // const activityN = new Activity({
//                         //     activityName,
//                         //     description,
//                         //     startDate,
//                         //     bidEndDate,
//                         //     location,
//                         //     responsiblePerson,
//                         //     phoneNo,
//                         //     limitParticipant
//                         // });
//                         user.findOneAndUpdate({ "_id": "5f2922a1a7d50c04ca6c0aa8" },
//                             { $push: { "enrolled": activity } },
//                             { upsert: true },
//                             function (err, activity) {
//                                 if (err) {
//                                     console.log('ACTIVITY ENROLL ERROR', err);
//                                     return res.status(400).json({
//                                         error: 'Student enroll activity failed'
//                                     });
//                                 }
//                                 return res.json({
//                                     success: true,
//                                     message: 'Student enrolled activity Successfully',
//                                     activity
//                                 });
//                             })

//                         // user.save((err, activity) => {
//                         //     if (err) {
//                         //         console.log('ACTIVITY ENROLL ERROR', err);
//                         //         return res.status(400).json({
//                         //             error: 'Student enroll activity failed'
//                         //         });
//                         //     }
//                         //     return res.json({
//                         //         success: true,
//                         //         message: 'Student enrolled activity Successfully',
//                         //         activity
//                         //     });
//                         // });
//                     }
//                 });
//             }
//         });
//     }
// };