const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;
const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  choose: [
    {
      text: {
        type: String,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
  mark: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    defult: Date.now(),
  },
});

const validateQuestion = (question) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    choose: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
        isCorrect: Joi.boolean().default(false),
      })
    ),
    mark: Joi.number().required(),
    createdAt: Joi.date().default(Date.now),
  });

  return schema.validate(question);
};

module.exports = {
  Question: mongoose.model("Question", questionSchema),
  validateQuestion: validateQuestion,
};
