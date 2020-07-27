const express = require('express');
const router = express.Router();

// Validation
const {
    validSign
} = require('../helpers/valid')

// import controller
const { requireSignin, adminMiddleware } = require('../controllers/auth.controller');
const { readController, updateController, viewController, deleteController } = require('../controllers/user.controller');

router.get('/users', viewController);
router.get('/user/:id', requireSignin, readController);
router.put('/user/update', requireSignin, validSign, updateController);
router.put('/admin/update', requireSignin, validSign, adminMiddleware, updateController);
router.delete('/user/:id', deleteController);

module.exports = router;