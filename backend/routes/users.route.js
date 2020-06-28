const express = require('express');
const router = express.Router();

// import controller
const { requireSignin, adminMiddleware } = require('../controllers/auth.controller');
const { readController, updateController,viewController,deleteController } = require('../controllers/user.controller');

router.get('/users',viewController);
router.get('/user/:id', requireSignin, readController);
router.put('/user/update', requireSignin, updateController);
router.put('/admin/update', requireSignin, adminMiddleware, updateController);
router.delete('/user/:id', requireSignin, adminMiddleware, deleteController);

module.exports = router;