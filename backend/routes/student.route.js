const express = require('express');
const router = express.Router();

// Validation
const {
    validSign
} = require('../helpers/valid')

// import controller
const { requireSignin } = require('../controllers/auth.controller');
const { enrollActivityController } = require('../controllers/student.controller');
const { transferController } = require('../controllers/student.controller')
const { round1BidController } = require('../controllers/student.controller')
const { listRound1TransferController } = require('../controllers/student.controller')
const { round2BidController } = require('../controllers/student.controller')
const { listRound2TransferController } = require('../controllers/student.controller')
const { deleteAllRound1TransferController } = require('../controllers/student.controller')
const { deleteAllRound2TransferController } = require('../controllers/student.controller')


router.post('/student/enrollActivity/:userId', enrollActivityController);
router.post('/student/transfer', transferController);
router.post('/student/firstBidRound', round1BidController);
router.get('/firstBidRoundTransfer', listRound1TransferController);
router.post('/student/secondBidRound', round2BidController);
router.get('/secondBidRoundTransfer', listRound2TransferController);
router.post('/cleanUpRound1List', deleteAllRound1TransferController)
router.post('/cleanUpRound2List', deleteAllRound2TransferController)





module.exports = router;