const router = require("express").Router();
const admin = require("../middlware/adminMiddleware");
const auth = require("../middlware/authMiddleware");

const Upload = require("../utils/multer");
const {
  getUsers,
  SignUp,
  enrolledCourses,
  updateProfile,
  updateUser,
  deleteProfilePicture,
  getUserProfile,
  lecView,
  getAllcourses,
  removeUser,

} = require("../Controllers/userController");

router.get("/", [auth, admin], getUsers);

router.post("/signup", SignUp);
router.get("/enrolledCourses/:userId", [auth], enrolledCourses);
router.put(
  "/updateProfile/:userId",
  [auth],
  Upload.single("image"),
  updateProfile
);
router.put("/:userId", [auth], updateUser);
router.delete("/:userId/profileImage", [auth], deleteProfilePicture);
router.get("/:userId/userProfile", [auth], getUserProfile);
//lecture view
router.get("/:userId/:courseId/:lectureId", [auth], lecView);
router.get("/allCourses/", [auth, admin], getAllcourses);

router.delete("/specficUser/:userId", [auth, admin], removeUser);
module.exports = router;
