const { Notification } = require("../Models/notification-model");
const admin = require("firebase-admin");
const serviceAccount = require("../file/code.json");
const { User } = require("../Models/user-model");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://elearning1-69342.firebaseio.com/",
});

exports.sendNotify = async (courseId,description) => {
  if (typeof courseId !== "string") {
    courseId = courseId.toString();
  }
  const users = await User.find({ enrolledCourses: courseId }).exec();
  users.map(async (user) => {
    const notification = await new Notification({
      description: description,
      receiver: {
        id: user._id,
        name: user.firstName,
      },
      courseId: courseId,
    });
    await notification.save();
    const message = {
      notification: {
        title: "Course Update",
        body: description,
      },
      data: {
        type: "course-update",
        courseId: courseId,
      },
    };
    await admin.messaging().sendToTopic(`${courseId}`, message);
    // await admin.messaging().send(message);
    console.log("return notify");
  });
  return true;
};
