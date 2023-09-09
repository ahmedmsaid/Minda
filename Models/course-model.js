const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  courseName: {
    type: String,
  },
  doctorData: {
    firstName: {
      type: String,
    },
    doctorId: {
      type: String,
    },
  },
  description: {
    type: String,
  },
  mark: {
    type: Number,
  },
  createdAt: {
    type: Date,
    defult: Date.now(),
  },
  enroll: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lectureId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Lec",
    },
  ],
  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  quizResponses: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      quizId: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
      marks: {
        type: Number,
        default: 0,
      },
      quizMark: {
        type: Number,
        default: 0,
      },
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  averageRating: {
    type: Number,
    default: null,
  },
  duration: {
    type: String,
    required: true,
    default: "00:00:00",
  },
  assignments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});
const validateCourse = (course) => {
  const schema = Joi.object({
    courseName: Joi.string().required(),
    description: Joi.string().required(),
    mark: Joi.number(),
    createdAt: Joi.date().default(Date.now),
    enroll: Joi.array().items(Joi.string().required()),
    lectureId: Joi.array().items(Joi.string().required()),
    reviews: Joi.array().items(Joi.string().required()),
    averageRating: Joi.number().default(null),
  });

  return schema.validate(course);
};
courseSchema.methods.getQuizById = function (quizId) {
  return this.quizzes.find((quiz) => quiz._id.toString() === quizId.toString());
};

module.exports = {
  Course: mongoose.model("Course", courseSchema),
  validateCourse: validateCourse,
};
