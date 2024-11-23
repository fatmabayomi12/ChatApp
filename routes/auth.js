const express = require('express');
const {createNewAcc , registerNewAcc , userLogin} = require('../controller/auth');


const router = express.Router();

router.post("/register" , createNewAcc);
router.post("/register/phone", registerNewAcc);
router.post("/login", userLogin);

module.exports = router;