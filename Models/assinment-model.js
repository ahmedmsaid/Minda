const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;
const filestack = require("filestack-js");
// Replace with your Filestack API key

// Assignment Schema
const assignmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  file: {
    type: String, // Assuming you store the file URL as a string
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  submissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "AssignmentSubmission",
    },
  ],
  assignmentResponses: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      submissionId: {
        type: Schema.Types.ObjectId,
        ref: "AssignmentSubmission",
      },
      score: {
        type: Number,
        default: 0,
      },
    },
  ],
});
module.exports = mongoose.model("Assignment", assignmentSchema);
