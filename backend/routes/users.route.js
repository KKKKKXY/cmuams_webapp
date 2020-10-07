const express = require('express');
const router = express.Router();

// Validation
const {
    validSign
} = require('../helpers/valid')

// import controller
const { requireSignin, adminMiddleware } = require('../controllers/auth.controller');
const { readUserController, updateUserController, viewUsersController, deleteUserController } = require('../controllers/user.controller');

router.get('/users', viewUsersController);
router.get('/user/:id', readUserController);
router.put('/user/update', requireSignin, validSign, updateUserController);
router.put('/admin/update', requireSignin, validSign, adminMiddleware, updateUserController);
router.delete('/user/:id', deleteUserController);

module.exports = router;