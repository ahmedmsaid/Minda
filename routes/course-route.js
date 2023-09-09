const router = require("express").Router();
const auth = require("../middlware/authMiddleware");
const admin = require("../middlware/adminMiddleware");
const {
  getCourse,
  getCourses,
  postCourse,
  updateCourse,
  deleteCourse,
  getquizResponses,
  courseDetails,
  searchAboutUser,
  courseDet,
  courseInfo,
  courseInfomation,
  UpdateCourseData,
  getusersEnrolled,
} = require("../Controllers/coursesController");

router.get("/:id", [auth], getCourse);

router.post("/:docId", [auth], postCourse);
router.put("/:id/enroll", [auth], updateCourse);
router.delete("/:courseId", [auth], deleteCourse);
router.get("/admin/getCourses", [auth, admin], getCourses);
router.get("/courseDetails/:courseId", [auth], courseDetails);
router.get("/course-Details/:courseId", [auth], courseDet);
router.get("/couseInfo/:courseId", [auth], courseInfo);
router.get("/doctor/couseInfo/:courseId", [auth], courseInfomation);
router.get("/courses/:courseId/quizResponses", [auth], getquizResponses);
router.get("/course/:id/quiz/:quizId/usermark", [auth], searchAboutUser);
router.put("/updateCourseInfo/:courseId", [auth], UpdateCourseData);
router.get("/:courseId/getusersEnrolled", [auth, admin], getusersEnrolled);
module.exports = router;
