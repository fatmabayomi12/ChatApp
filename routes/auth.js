const express = require('express');
const {createNewAcc , registerNewAcc} = require('../controller/auth');


const router = express.Router();

router.post("/register" , createNewAcc);
router.post("/register/phone", registerNewAcc);


module.exports = router;