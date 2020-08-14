// Validations Helpers
const {
    check
} = require('express-validator');

// Register
exports.validSign = [
    check('name', 'Name is required').notEmpty()
        .isLength({
            min: 4,
            max: 32
        }).withMessage('name must be between 4 to 32 characters'),
    check('email', 'Email is required').notEmpty()
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]

// Login
exports.validLogin = [
    check('email','Email is required').notEmpty()
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]

// Forget Password
exports.forgotPasswordValidator = [
    check('email','Email is required').notEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

// Reset Password
exports.resetPasswordValidator = [
    check('newPassword','password is required').notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
];

// Edit Activity
exports.ActivityValidator = [
    check('activityName', 'Name is required').notEmpty()
        .matches(/^[.0-9a-zA-Z \b]+$/)
        .withMessage('The activity name cannot include special characters.'),
    check('description', 'Description is required').notEmpty(),
    check('startDate', 'Start date is required').notEmpty(),
    check('bidEndDate', 'Bid end date is required').notEmpty(),
    check('location', 'Location is required').notEmpty()
        .matches(/^[.0-9a-zA-Z \b]+$/)
        .withMessage('Please fill in correct location address.'),
    check('responsiblePerson', 'Responsible person name is required').notEmpty(),
    check('phoneNo', 'Phone number is required').notEmpty()
        .isNumeric()
        .withMessage('Please fill in correct format.'),
    check('phoneNo')
        .isLength({ min: 9 })
        .withMessage('Phone number must contain at least 9 digits'),
    check('limitParticipant', 'Limit participant is required').notEmpty()
        .isNumeric()
        .withMessage('Only digit.')
];