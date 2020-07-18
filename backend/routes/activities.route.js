const express = require('express');
const router = express.Router();

// import controller
const { requireSignin } = require('../controllers/auth.controller');
const { ListController,readController,AddController,deleteController} = require('../controllers/activity.controller');

router.get('/activities', ListController);
router.get('/activity/:id', requireSignin, readController);
router.post('/activity/add', AddController);
router.delete('/activity/:id', deleteController);


module.exports = router;