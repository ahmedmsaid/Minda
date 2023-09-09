const router = require("express").Router();

const {
  // userForgetPassword,
  // doctorForgetPassword,
  // userResetPassword,
  // doctorResetPassword,
  postReset,
  postCheckTokenDoc,
  postCheckToken,
  postResetDoc,
  postResetNewPassword,
  postResetNewPasswordDoc,
} = require("../Controllers/Forget-reset-PasswordController");

// router.post("/user/forgot-password", userForgetPassword);
// router.post("/user/reset-password/:token", userResetPassword);
// router.post("/doctor/forgot-password", doctorForgetPassword);
// router.post("/doctor/reset-password/:token", doctorResetPassword);
////////////for user
router.post("/reset", postReset);
router.post("/reset/check-token", postCheckToken);
router.post("/reset/new-password", postResetNewPassword);

router.post("/resetDoc", postResetDoc);
router.post("/reset/checkToken/Doc", postCheckTokenDoc);
router.post("/reset/new-password/Doc", postResetNewPasswordDoc);
module.exports = router;
