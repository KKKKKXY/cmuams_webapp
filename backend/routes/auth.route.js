const express = require('express')
const router = express.Router()

// Validation
const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')

// Load Controllers
const {
    registerController,
    activationController,
    signinController,
    forgotPasswordController,
    resetPasswordController
} = require('../controllers/auth.controller')

router.post('/register', validSign, registerController)
router.post('/login', validLogin, signinController)
router.post('/activation', activationController)
// forgot reset password
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
router.put('/resetpassword', resetPasswordValidator, resetPasswordController);

module.exports = router