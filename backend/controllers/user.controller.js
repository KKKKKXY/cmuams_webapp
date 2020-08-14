const User = require('../models/auth.model');
const { validationResult } = require('express-validator');


exports.readUserController = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.updateUserController = (req, res) => {
    const { name, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        User.findOne({ _id: req.user._id }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }

            if (!name) {
                return res.status(400).json({
                    error: 'Name is required'
                });
            } else {
                user.name = name;
            }

            if (password) {
                if (password.length < 6) {
                    return res.status(400).json({
                        error: 'Password must contain at least 6 characters'
                    });
                } else {
                    user.password = password;
                }
            }

            user.save((err, updatedUser) => {
                if (err) {
                    console.log('USER UPDATE ERROR', err);
                    return res.status(400).json({
                        error: 'User update failed'
                    });
                }
                updatedUser.hashed_password = undefined;
                updatedUser.salt = undefined;
                return res.json({
                    success: true,
                    message: 'Profile Updated Successfully',
                    updatedUser
                });
            });
        });
    }
};

exports.viewUsersController = (req, res) => {
    User.find().exec((err, user) => {
        if (err || !user || user == "") {
            return res.status(400).json({
                error: 'Users not found'
            });
        }
        res.json(user);
    });
};

exports.deleteUserController = (req, res) => {
    const userId = req.params.id;
    User.findByIdAndDelete(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        return res.json({
            success: true,
            message: 'User deleted!'
        });
    });
};