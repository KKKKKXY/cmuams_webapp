const Activity = require('../models/activity.model');
const User = require('../models/auth.model');
const { validationResult } = require('express-validator');
const Transfer = require('../models/transfer.model');
const BlockChain = require('../controllers/blockchain.controller')

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

exports.transferController = (req, res) => {
    const { senderEmail, recipientEmail, transferDate, amount } = req.body;
    let blockChain = new BlockChain();
    blockChain.addNewTransaction({senderEmail, recipientEmail, amount});
    blockChain.addNewBlock(null);
    const errors = validationResult(req);
    const transfer = new Transfer({ senderEmail, recipientEmail, transferDate, amount });
    // transfer.save()
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        User.findOne({email: senderEmail}).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'The sender Email can not found'
                });
            } else {
                User.findOne({email: recipientEmail}).exec((err, user) => {
                    if (err || !user) {
                        return res.status(400).json({
                            error: 'The recipient Email can not found'
                        });
                    } else {
                        console.log(transfer)
                        user.transaction.push(transfer)
                        user.save()
                        return res.json({
                            success: true,
                            message: 'Transfer successfully',
                            transfer
                        });
                    }
                });
            }
        });
    }
};