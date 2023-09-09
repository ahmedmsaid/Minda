const { Question } = require("../Models/questions-model");
const { Quiz } = require("../Models/quiz.model");
const { Doctor } = require("../Models/doctor-model");
const { Course } = require("../Models/course-model");
const { User } = require("../Models/user-model");
const ErrorResponse = require("../utils/errorResponse");

const addQuiz = async (req, res, next) => {
  try {
    // Retrieve the doctor creating the quiz from the JWT
    const doctor = await Doctor.findById(req.user.id);
    // Ensure the doctor exists and is authorized to create quizzes
    if (!doctor) {
      return next(new ErrorResponse("Unauthorized"));
    }
    // Retrieve the course to which the quiz belongs
    const course = await Course.findById(req.params.courseId);
    console.log("courseid", course._id);
    // Ensure the course exists and is associated with the doctor creating the quiz
    if (!course || course.doctorData.doctorId !== doctor.id) {
      return next(
        new ErrorResponse(
          "Unauthorized access. Only the course creator can create quizzes for the course."
        )
      );
    }
    const questionsId = await Promise.all(
      req.body.questions.map(async (question) => {
        let newquestion = new Question({
          title: question.title,
          choose: question.choose,
          mark: question.mark,
        });
        newquestion = await newquestion.save();
        return newquestion;
      })
    );
    const questionResolve = questionsId;
    let quizmark = 0; // Initialize quizmark to 0

    // Loop through the questions and add the marks to quizmark
    for (let i = 0; i < questionResolve.length; i++) {
      quizmark += questionResolve[i].mark;
    }

    const quiz = new Quiz({
      quizname: req.body.quizname,
      questions: questionsId,
      quizmark: quizmark,
      courseId: course._id,
      duration: req.body.duration, // Assign the courseId to the quiz
    });

    // Save the new quiz to the database and associate it with the course
    await quiz.save();
    course.quizzes.push(quiz._id);
    await course.save();

    // Return the newly created quiz document
    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//////////////////////////////////////////////////////////////////old
const submitAnswer = async (req, res, next) => {
  const { courseId, quizId } = req.params;
  const { answers } = req.body;
  try {
    const course = await Course.findById(courseId);
    const quiz = await Quiz.findById(quizId);
    if (!course) {
      return next(new ErrorResponse("Course not found."));
    }
    if (!quiz) {
      return next(new ErrorResponse("Quiz not found"));
    }
    const user = await User.findById(req.user.id);
    if (!user.enrolledCourses.includes(courseId)) {
      return next(new ErrorResponse("User is not enrolled in the course."));
    }
    const userQuiz = user.infoQuizs.find((q) => q.quizId === quizId);
    if (userQuiz) {
      return next(new ErrorResponse("User has already attempted the quiz."));
    }
    // Check if the authenticated user is the doctor who created the course
    if (course.doctorData.doctorId == user.id) {
      return next(
        new ErrorResponse(
          "Unauthorized access. Only the course creator can create quizzes for the course."
        )
      );
    }
    let totalScore = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = await Question.findById(quiz.questions[i]);

      if (answers[i] !== -1 && question.choose[answers[i]].isCorrect) {
        totalScore += question.mark;
      }
    }
    user.infoQuizs.push({ quizId, usermark: totalScore });
    await user.save();
    quiz.mark += totalScore;
    await quiz.save();
    // Calculate quiz mark and update totalMark field
    let quizMark = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = await Question.findById(quiz.questions[i]);
      quizMark += question.mark;
    }
    quiz.quizmark = quizMark;
    await quiz.save();
    // Update quizResponses array in Course model
    const quizIndex = course.quizzes.findIndex((q) => q._id === quizId);
    const userIndex = course.quizResponses.findIndex(
      (q) => q.userId.toString() === user.id
    );
    if (quizIndex !== -1 && userIndex !== -1) {
      course.quizResponses[userIndex].marks = totalScore;
      course.quizResponses[userIndex].quizMark = quizMark;
      await course.save();
    } else {
      course.quizResponses.push({
        userId: user.id,
        quizId,
        marks: totalScore,
        quizMark,
      });
      await course.save();
    }
    const formattedMessage = `${totalScore}`.replace(/\s+/g, ""); // Remove spaces
    res.status(200).json(formattedMessage.toString());
  } catch (err) {
    next(err);
  }
};

const x = async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  console.log("course", course);
};
const dataAboutUserSubmitQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;
    const course = await Course.findById(req.params.courseId);
    console.log("course", course);
    console.log("quiz", quizId);
    if (!course) {
      return next(new ErrorResponse("Course not found."));
    }
    // Check if the requesting doctor is the creator of the course
    if (course.doctorData.doctorId !== req.user.id) {
      return next(new ErrorResponse("Unauthorized access."));
    }
    // Get the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }
    // Get enrolled users for the course
    const enrolledUsers = course.enroll;
    // Get quiz responses for the quiz
    const quizResponses = course.quizResponses.filter((response) =>
      response.quizId.equals(quizId)
    );
    // Filter quiz responses by enrolled users for the course
    const filteredQuizResponses = quizResponses.filter((response) =>
      enrolledUsers.includes(response.userId)
    );
    // Get user information for filtered quiz responses
    const quizResponseUsers = await User.find(
      {
        _id: {
          $in: filteredQuizResponses.map((response) => response.userId),
        },
      },
      { _id: 1, firstName: 1, lastName: 1 }
    );
    // Get the quiz mark
    const quizMark = quiz.quizmark;
    // Merge user information into quiz responses
    const quizResponseData = filteredQuizResponses.map((response) => {
      const user = quizResponseUsers.find((u) => u._id.equals(response.userId));
      return {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        mark: response.marks,
      };
    });
    res.status(200).json({
      quizMark: quizMark,
      quizResponseData: quizResponseData,
    });
  } catch (err) {
    next(err);
  }
};
const getQuizz = async (req, res, next) => {
  const docId = req.user.id;
  try {
    const courseId = req.params.courseId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId);
    if (docId == course.doctorData.doctorId) {
      const course = await Course.findById(courseId).populate({
        path: "quizzes",
        populate: "questions",
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      // Find the specific quiz in the course
      const quiz = course.getQuizById(quizId);

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      // Return the quiz
      res.json({ quiz });
    } else {
      res.status(403).json({ error: "User is not enrolled in the course" });
    }
  } catch (err) {
    next(err);
  }
};
const getQuiz = async (req, res, next) => {
  const userId = req.user.id; // Assuming you have middleware that adds the authenticated user to the request object

  try {
    const courseId = req.params.Courseid;
    const quizId = req.params.Quizid;

    // Find the course by courseId
    const course = await Course.findById(courseId).populate({
      path: "quizzes",
      populate: "questions",
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the user is enrolled in the course
    const isEnrolled = course.enroll.includes(userId);

    if (!isEnrolled) {
      return res
        .status(403)
        .json({ error: "User is not enrolled in the course" });
    }

    // Find the specific quiz in the course
    const quiz = course.getQuizById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Return the quiz
    res.json({ quiz });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const doctorId = req.user.id;

    const quiz = await Quiz.findOne({
      _id: quizId,
      doctorData: { doctorId: doctorId },
    });

    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found or unauthorized" });
    }

    const courseId = quiz.courseId; // Assuming courseId is stored as a property in Quiz model

    // Check if the authenticated doctor is the creator of the course
    const course = await Course.findOne({
      _id: courseId,
      "doctorData.doctorId": doctorId,
    });
    console.log("course", course);
    if (!course) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete the quiz" });
    }

    // Remove quiz reference from infoQuizs in users who have attempted the quiz
    await User.updateMany(
      { "infoQuizs.quizId": quizId },
      { $pull: { infoQuizs: { quizId: quizId } } }
    );

    // Remove quiz reference from quizResponses in the related course
    await Course.updateMany(
      { "quizResponses.quizId": quizId },
      { $pull: { quizResponses: { quizId: quizId } } }
    );

    // Delete the quiz document
    await Quiz.deleteOne({ _id: quizId });

    // Remove quiz reference from the related course
    await Course.updateOne({ _id: courseId }, { $pull: { quizzes: quizId } });

    res.sendStatus(200); // Quiz and related data deleted successfully
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal server error
  }
};

const searchAboutUser = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send("Course not found.");

    const quiz = course.getQuizById(req.params.quizId);
    if (!quiz) return res.status(404).send("Quiz not found.");

    const quizResponse = course.quizResponses.find(
      (response) =>
        response.quizId.equals(quiz._id) && response.userId.equals(req.user.id)
    );
    console.log("quizResponse", quizResponse);

    if (!quizResponse) {
      return res.status(404).json({
        status: "error",
        message: "Quiz response not found.",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) return next(new ErrorResponse("User not found."));

    const userQuiz = user.infoQuizs.find(
      (q) => q.quizId.toString() === req.params.quizId.toString()
    );
    if (!userQuiz) return next(new ErrorResponse("User quiz not found."));

    const result = {
      userMark: userQuiz.usermark,
      quizMark: quizResponse.quizMark,
      userData: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

module.exports = {
  addQuiz,
  submitAnswer,
  dataAboutUserSubmitQuiz,
  getQuiz,
  x,
  deleteQuiz,
  getQuizz,
  searchAboutUser,
};
