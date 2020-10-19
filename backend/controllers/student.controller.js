const Activity = require('../models/activity.model');
const User = require('../models/auth.model');
const { validationResult } = require('express-validator');
const Transfer = require('../models/transfer.model');
const BlockChain = require('../controllers/blockchain.controller')
const BidTransfer = require('../models/bidTransfer.model');
const { errorHandler } = require('../helpers/dbErrorHandling');
const blockChainModel = require('../models/blockchain.model')

exports.enrollActivityController = (req, res) => {

    const { activity } = req.body;
    const errors = validationResult(req);

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
            } else {
                let students = act.students

                if (students.length > 0) {
                    //sort students
                    students.sort((a, b) => {
                        //sort by amount
                        if (a.amount < b.amount)
                            return 1;
                        else if (a.amount > b.amount)
                            return -1;

                        //sort by date
                        if (a.transferDate < b.transferDate)
                            return -1;
                        else if (a.transferDate > b.transferDate)
                            return 1;

                        return 0;
                    })

                    for (var i = 0; i < act.seats; i++) {
                        let stu = students[i].student

                        User.findOne({ name: stu }).exec((err, user) => {
                            if (err || !user) {
                                // return res.status(400).json({
                                //     error: 'User not found'
                                // });
                            } else {
                                const enrollActivity = new Activity({
                                    activityName: act.activityName,
                                    description: act.description,
                                    activityDate: act.activityDate,
                                    bidDate: act.bidDate,
                                    location: act.location,
                                    responsiblePerson: act.responsiblePerson,
                                    contact: act.contact,
                                    seats: act.seats,
                                    creator: act.creator
                                });
                                if ((user.enrolled).some(enrolled => enrolled.activityName == activity)) {
                                    // return res.status(400).json({
                                    //     message: user.name + ' already enrolled ' + enrollActivity.activityName+' !'
                                    // });
                                }
                                else {
                                    user.enrolled.push(enrollActivity)
                                }
                            }
                            user.save()
                        })
                    }

                    for (var j = act.seats; j < act.students.length; j++) {
                        act.students.splice(j, 1);
                    }
                }
            }
            act.save()
            return res.json({
                success: true,
                message: 'Student enrolled activity Successfully'
            });
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
                            error: 'The recipient email can not be found.'
                        });
                    } else {
                        if (sender.coins < amount) {
                            return res.status(400).json({
                                error: 'Your available balance is insufficient.'
                            });
                        } else {
                            if (amount == 0) {
                                return res.status(400).json({
                                    error:'Invalid amount.'
                                })
                            }else
                            sender.coins = parseInt(sender.coins) - parseInt(amount)
                            recipient.coins = parseInt(recipient.coins) + parseInt(amount)
                            blockChain.addNewTransaction({ senderEmail, recipientEmail, amount, transferDate });
                            blockChain.addNewBlock(null);
                            sender.save()
                            recipient.save()
                            return res.json({
                                success: true,
                                message: 'Transfer successfully.',
                                transfer
                            });
                        }

                    }

                });
            }
        });
    }
};

exports.getTransferController = (req, res) => {
    const userId = req.params.id;

    User.findById({ _id: userId }).exec((err, user) => {
        if (err || !user) {
            // return res.status(400).json({
            //     error: 'User not found'
            // });
        } else {
            blockChainModel.find().exec((err, chains) => {
                if (err || !chains || chains == "") {
                    // return res.status(400).json({
                    //     error: 'Activities not found'
                    // });
                }
                else {
                    console.log(chains.length)
                    let transfer = []

                    for (var i = 0; i < chains.length; i++) {
                        console.log((chains[i].transaction[0].senderEmail == user.email) || (chains[i].transaction[0].recipientEmail == user.email))

                        if ((chains[i].transaction[0].senderEmail == user.email) || (chains[i].transaction[0].recipientEmail == user.email)) {
                            transfer.push(chains[i].transaction[0])
                        }
                    }
                    return res.json({
                        success: true,
                        transfer
                    });
                }
            });
        }
    })
};