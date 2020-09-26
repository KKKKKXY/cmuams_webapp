const express = require('express');
const router = express.Router();

// Validation
const {
    validSign
} = require('../helpers/valid')

// import controller
const { requireSignin } = require('../controllers/auth.controller');
const { enrollActivityController } = require('../controllers/student.controller');

router.post('/student/enrollActivity/:activityId/:userId', enrollActivityController);

module.exports = router;