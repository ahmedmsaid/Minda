const router = require("express").Router();
const auth = require("../middlware/authMiddleware");
const {
  addQuiz,
  submitAnswer,
  dataAboutUserSubmitQuiz,
  getQuiz,
  x,
  searchAboutUser,
  deleteQuiz,
  getQuizz,
} = require("../Controllers/quizController");

// Routes
router.post("/courses/:courseId/quizzes", [auth], addQuiz);
router.post("/courses/:courseId/quizzes/:quizId/submit", [auth], submitAnswer);
router.get(
  "/courseId/:courseId/quizId/:quizId",
  [auth],
  dataAboutUserSubmitQuiz
);
router.get("/:courseId", x);

//by user
router.get("/:Quizid/:Courseid", [auth], getQuiz);
router.delete("/quizzes/:quizId", [auth], deleteQuiz);
router.get("/:quizId/:courseId/forDoc", [auth], getQuizz);
router.get(
  "/courses/:id/quizzes/:quizId/user/:userId",
  [auth],
  searchAboutUser
);

module.exports = router;
