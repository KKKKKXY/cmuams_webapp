const Activity = require('../models/activity.model');
const User = require('../models/auth.model');
const { validationResult } = require('express-validator');
const Transfer = require('../models/transfer.model');
const BlockChain = require('../controllers/blockchain.controller')
const BidTransfer = require('../models/bidTransfer.model');
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

exports.BidController = (req, res) => {

    const { activity, student, amount, transferDate } = req.body;
    const errors = validationResult(req);
    const transfer = new BidTransfer({
        student, amount, transferDate
    });

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        User.findOne({ name: student }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }
            else {
                Activity.findOne({ activityName: activity }).exec((err, act) => {
                    if (err || !act) {
                        return res.status(400).json({
                            error: 'Activity not found'
                        });
                    }
                    else {
                        if ((act.students).some(stu => stu.student == student)) {
                            return res.status(400).json({
                                error: 'You already have bided the activity!'
                            });
                        }
                        else {
                            act.students.push(transfer)
                            user.bidActivities.push(act._id)
                            act.save()
                            user.save()
                            return res.json({
                                success: true,
                                message: 'Student enrolled activity Successfully',
                                transfer
                            });
                        }
                    }
                })
            }
        })
    }
};

exports.UpdateCoinsAmountController = (req, res) => {

    const { activity, student, amount, transferDate } = req.body;
    const errors = validationResult(req);
    const transfer = new BidTransfer({
        student, amount, transferDate
    });

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        Activity.findOne({ activityName: activity }).exec((err, act) => {
            if (err || !act) {
                return res.status(400).json({
                    error: 'Activity not found'
                });
            }
            else {
                let index = act.students.findIndex(stu => stu.student == student)
                let stuBidTransfer = act.students[index]

                stuBidTransfer.student = transfer.student
                stuBidTransfer.amount = transfer.amount
                stuBidTransfer.transferDate = transfer.transferDate

                act.students.splice(index, 1);
                act.students.push(stuBidTransfer)


                act.save((err, editedActivity) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Coins update failed'
                        });
                    }
                    return res.json({
                        success: true,
                        message: 'Update Coins Amount Successfully!',
                        editedActivity
                    });
                });
            }
        });
    }
};

exports.listBidTransferController = (req, res) => {
    const activityId = req.params.id;
    Activity.findById(activityId).exec((err, activity) => {
        if (err || !activity) {
            return res.status(400).json({
                error: 'Activity not found'
            });
        }
        res.json(activity);
    })
};

exports.deleteAllRound1TransferController = (req, res) => {
    const { to } = req.body;
    BidTransfer.findOne({ to: to }).exec((err, transfer) => {
        if (err) {
            return res.json({
                error: 'There are something wrong!'
            });
        }

        BidTransfer.deleteMany({ to: to }).exec((err, deleteInfo) => {
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
    const { to } = req.body;
    SecondRound.findOne({ to: to }).exec((err, transfer) => {
        if (err) {
            return res.json({
                error: 'There are something wrong!'
            });
        }

        SecondRound.deleteMany({ to: to }).exec((err, deleteInfo) => {
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