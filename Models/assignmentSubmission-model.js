const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSubmissionSchema = new Schema({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answerFile: {
    type: String, // Assuming you store the file URL as a string
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "AssignmentSubmission",
  assignmentSubmissionSchema
);
