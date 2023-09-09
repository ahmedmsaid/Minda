const Joi = require("joi");
const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizname: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  quizmark: {
    type: Number,
    default: 0,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  duration: {
    type: String,
    // Validate the time format using a regular expression (HH:mm)
    validate: {
      validator: function (value) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      },
      message: "Please provide the time in the format HH:mm",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const joiQuizSchema = Joi.object({
  quizname: Joi.string(),
  quizmark: Joi.number().default(0),
  createdAt: Joi.date().default(Date.now),
});

const validateQuiz = (quiz) => {
  return joiQuizSchema.validate(quiz);
};

module.exports = {
  Quiz: mongoose.model("Quiz", quizSchema),
  validateQuiz: validateQuiz,
};
