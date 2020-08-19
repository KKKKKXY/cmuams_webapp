const express = require('express');
const router = express.Router();

// Validation
const {
    ActivityValidator
} = require('../helpers/valid')

// import controller
const { requireSignin } = require('../controllers/auth.controller');
const { listActivityController, readActivityController, addActivityController, deleteActivityController, editActivityController } = require('../controllers/activity.controller');

router.get('/activities', listActivityController);
router.get('/activity/:id', readActivityController);
router.post('/activity/add', ActivityValidator, addActivityController);
router.delete('/activity/:id', deleteActivityController);
router.put('/activity/update/:id', ActivityValidator, editActivityController);

module.exports = router;