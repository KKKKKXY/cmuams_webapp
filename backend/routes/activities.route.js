const express = require('express');
const router = express.Router();

// Validation
const {
    ActivityValidator
} = require('../helpers/valid')

// import controller
const { requireSignin } = require('../controllers/auth.controller');
const { ListController, readController, AddController, deleteController, editController } = require('../controllers/activity.controller');

router.get('/activities', ListController);
router.get('/activity/:id', readController);
router.post('/activity/add', ActivityValidator, AddController);
router.delete('/activity/:id', deleteController);
router.put('/activity/update', ActivityValidator, editController);

module.exports = router;