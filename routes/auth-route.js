const express = require("express");
const router = express.Router();

const {
  doctorLogin,
  userLogin
} = require("../Controllers/authController");


router.post("/doctorLogin",doctorLogin); 
router.post("/userLogin",userLogin); 


module.exports = router;
