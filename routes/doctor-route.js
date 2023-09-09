const router = require("express").Router();
const auth = require("../middlware/authMiddleware");
const admin = require("../middlware/adminMiddleware");
const Upload = require("../utils/multer");
const jasmine = require("jasmine");
const request = require("supertest");

const {
  getDoctorProfile,
  getAllDoctors,
  SignUp,
  updateProfile,
  updateDoctorData,
  deleteProfilePicture,
  lecDetails,
} = require("../Controllers/doctorConrtoller");

router.get("/", [auth, admin], getAllDoctors);
router.post("/signup", SignUp);
router.put(
  "/updateProfile/:doctorId",
  [auth],
  Upload.single("image"),
  updateProfile
);
router.put("/:doctorId", [auth], updateDoctorData);
router.delete("/:doctorId/profileImage", [auth], deleteProfilePicture);
router.get("/:doctorId/doctorProfile", [auth], getDoctorProfile);
router.get("/:doctorId/:courseId/:lectureId", [auth], lecDetails);

module.exports = router;
