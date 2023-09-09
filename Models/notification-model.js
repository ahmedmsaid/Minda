const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notification = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },

    receiver: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    read: {
      type: String,
      default: "false",
    },
  },

  { timestamps: true }
);

exports.Notification = mongoose.model("Notifications", Notification);
