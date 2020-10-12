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
const { BidController } = require('../controllers/student.controller')
const { UpdateCoinsAmountController } = require('../controllers/student.controller')
const { listBidTransferController } = require('../controllers/student.controller')
const { deleteAllRound2TransferController } = require('../controllers/student.controller')
const { getTransferController } = require('../controllers/student.controller')


router.post('/student/enrollActivity', enrollActivityController);
router.post('/student/transfer', transferController);
router.post('/student/bidActivity', BidController);
router.get('/bidTransfer/:id', listBidTransferController);
router.put('/updateCoins', UpdateCoinsAmountController);
router.get('/transacHistory/:id', getTransferController)

router.post('/cleanUpRound2List', deleteAllRound2TransferController)

module.exports = router;