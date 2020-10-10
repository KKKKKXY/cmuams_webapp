const Activity = require('../models/activity.model');
const User = require('../models/auth.model');
const { validationResult } = require('express-validator');
const Transfer = require('../models/transfer.model');
const BlockChain = require('../controllers/blockchain.controller')
const FirstRound = require('../models/round1Transfer.model');
const { errorHandler } = require('../helpers/dbErrorHandling');
const SecondRound = require('../models/round2Transfer.model');

exports.enrollActivityController = (req, res) => {
    const userId = req.params.userId;
    const { activityName } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        Activity.findOne({ activityName: activityName }).exec((err, activity) => {
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
                        if ((user.enrolled).some(enrolled => enrolled.activityName == activityName)) {
                            return res.status(400).json({
                                error: 'You already transfered!'
                            });
                        }
                        else {
                            user.enrolled.push(activity)
                            user.save()
                            return res.json({
                                success: true,
                                message: 'Student enrolled activity Successfully',
                                activity
                            });
                        }
                    }
                });
            }
        });
    }
};

exports.transferController = (req, res) => {
    const { senderEmail, recipientEmail, transferDate, amount } = req.body;
    let blockChain = new BlockChain();
    const errors = validationResult(req);
    const transfer = new Transfer({ senderEmail, recipientEmail, transferDate, amount });
    // transfer.save()
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        User.findOne({ email: senderEmail }).exec((err, sender) => {
            if (err || !sender) {
                return res.status(400).json({
                    error: 'The sender Email can not found'
                });
            } else {
                User.findOne({ email: recipientEmail }).exec((err, recipient) => {
                    if (err || !recipient) {
                        return res.status(400).json({
                            error: 'The recipient Email can not found'
                        });
                    } else {
                        if (sender.coins < amount) {
                            return res.status(400).json({
                                error: 'Coins is not enough!'
                            });
                        } else {
                            sender.coins = parseInt(sender.coins) - parseInt(amount)
                            recipient.coins = parseInt(recipient.coins) + parseInt(amount)
                            blockChain.addNewTransaction({ senderEmail, recipientEmail, amount, transferDate });
                            blockChain.addNewBlock(null);
                            sender.save()
                            recipient.save()
                            return res.json({
                                success: true,
                                message: 'Transfer successfully',
                                transfer
                            });
                        }

                    }

                });
            }
        });
    }
};

exports.round1BidController = (req, res) => {
    const { id, from, to, amount, date } = req.body;
    const errors = validationResult(req);
    const transfer = new FirstRound({
        id, from, to, amount, date
    });

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        FirstRound.findOne({ from: from }).exec((err, user) => {
            if (err || user) {
                return res.status(400).json({
                    error: 'You already have bided the activity!'
                });
            }
            else {
                transfer.save((err, transfer) => {
                    if (err) {
                        console.log('Save error', errorHandler(err));
                        return res.status(401).json({
                            errors: errorHandler(err)
                        });
                    } else {
                        return res.json({
                            success: true,
                            message: '1st Round Bidding Successfully!',
                            transfer
                        });
                    }
                });
            }
        })
    }
};

exports.listRound1TransferController = (req, res) => {
    FirstRound.find().exec((err, transfer) => {
        if (err || !transfer || transfer == []) {
            return res.status(400).json({
                error: 'No Transfers'
            });
        }
        res.json(transfer);
    });
};

exports.deleteAllRound1TransferController = (req, res) => {
    const {to} = req.body;
    FirstRound.findOne({to : to}).exec((err, transfer) => {
        if (err) {
            return res.json({
                error: 'There are something wrong!'
            });
        }

        FirstRound.deleteMany({to : to}).exec((err, deleteInfo) => {
            console.log(transfer)
            if (err || !deleteInfo) {
                return res.json({
                    error: 'Unable to complete cleanup'
                });
            }
            return res.json({
                success: true,
                message: 'You already miss the chance to bid activity \'' + to + '\' ',
                transfer
            });
        });

    })
};

exports.round2BidController = (req, res) => {
    const { id, from, to, amount, date } = req.body;
    const errors = validationResult(req);
    const transfer = new SecondRound({
        id, from, to, amount, date
    });

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        SecondRound.findOne({ from: from }).exec((err, user) => {
            if (err || user) {
                return res.status(400).json({
                    error: 'You already have bided the activity!'
                });
            }
            else {
                transfer.save((err, transfer) => {
                    if (err) {
                        console.log('Save error', errorHandler(err));
                        return res.status(401).json({
                            errors: errorHandler(err)
                        });
                    } else {
                        return res.json({
                            success: true,
                            message: '2nd Round Bidding Successfully!',
                            transfer
                        });
                    }
                });
            }
        })
    }
};

exports.listRound2TransferController = (req, res) => {
    SecondRound.find().exec((err, transfer) => {
        if (err || !transfer || transfer == []) {
            return res.status(400).json({
                error: 'No Transfers'
            });
        }
        res.json(transfer);
    });
};

exports.deleteAllRound2TransferController = (req, res) => {
    const {to} = req.body;
    SecondRound.findOne({to : to}).exec((err, transfer) => {
        if (err) {
            return res.json({
                error: 'There are something wrong!'
            });
        }

        SecondRound.deleteMany({to : to}).exec((err, deleteInfo) => {
            console.log(transfer)
            if (err || !deleteInfo) {
                return res.json({
                    error: 'Unable to complete cleanup'
                });
            }
            return res.json({
                success: true,
                message: 'You already miss the chance to enroll activity \'' + to + '\' ',
                transfer
            });
        });

    })
};