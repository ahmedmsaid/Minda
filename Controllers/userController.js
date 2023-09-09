const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../Models/user-model");
const { Course } = require("../Models/course-model");
const Assignment = require("../Models/assinment-model");
const AssignmentSubmission = require("../Models/assignmentSubmission-model");
const Comment = require("../Models/comment-model");
const Post = require("../Models/post-model");

const Cloudinary = require("../utils/clouodinry");
const ErrorResponse = require("../utils/errorResponse");
const { Lec } = require("../Models/lec-model");

const SignUp = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message));

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return next(new ErrorResponse("Passwords do not match"));
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return next(new ErrorResponse(`user exists `));
    user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);
    const saveduser = await user.save();
    res
      .header("x-auth-token", user.generateAuthToken())
      .status(200)
      .json(saveduser); //send token//................................
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("firstName lastName enrolledCourses profileimg quizzes")
      .populate({
        path: "enrolledCourses",
        select: "courseName duration averageRating description",
      });

    if (!user) return next(new ErrorResponse("User doesn't exist"));

    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      enrolledCourses: user.enrolledCourses,
      profileimg: {},
      quizzes: user.quizzes,
      createdAt: user.createdAt,
    };

    if (user.profileimg && user.profileimg.url) {
      userProfile.profileimg = {
        public_id: user.profileimg.public_id,
        url: user.profileimg.url,
      };
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) return next(new ErrorResponse(`cant find that user`));
    res.json({ allUsers });
  } catch (err) {
    next(err);
  }
};

const enrolledCourses = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: "enrolledCourses",
      select: "courseName  duration averageRating description",
    });
    if (!user) return next(new ErrorResponse(`user not found`));
    res.status(200).json({ enrolledCourses: user.enrolledCourses });
  } catch (err) {
    next(err);
  }
};

const lecView = async (req, res, next) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;
  const lectureId = req.params.lectureId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`user not found`));
    }

    // Check if the user is enrolled in the specified course
    if (!user.enrolledCourses.includes(courseId)) {
      return next(new ErrorResponse("User is not enrolled in the course"));
    }

    // Find the lecture by ID
    const lecture = await Lec.findOne({ _id: lectureId, courseId: courseId });

    if (!lecture) {
      return next(new ErrorResponse("Lecture not found"));
    }

    // // Get the specific videos from the lecture
    const videos = lecture.vedios;

    // Return the videos to the client
    res.json(videos);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    const cloudinaryOptions = {
      folder: `/usersProfiles/${user._id}`,
      quality: "auto:low", // Set the quality to low
      transformation: [
        { width: 300, height: 300, crop: "limit" }, // Resize the image to a smaller size
      ],
    };

    const cloudinaryResponse = await Cloudinary.uploader.upload(
      req.file.path,
      cloudinaryOptions
    );

    console.log(req.file);

    const updateUser = user;
    if (updateUser.profileimg) {
      updateUser.profileimg.public_id = cloudinaryResponse.public_id;
      updateUser.profileimg.url = cloudinaryResponse.url;
    } else {
      updateUser.profileimg = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    }

    await updateUser.save();
    res.status(200).json({
      message: "Profile image updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("user not found"));
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    res.status(200).json({ message: "profile data updated success", user });
  } catch (err) {
    next(err);
  }
};
const deleteProfilePicture = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user._id == req.user.id) {
      if (user.profileimg.length != 0) {
        Cloudinary.api.delete_resources_by_prefix(
          `usersProfiles/${user._id}`,
          function (err) {
            if (err && err.http_code !== 404) {
              return callback(err);
            }
            Cloudinary.api.delete_folder(
              `usersProfiles/${user._id}`,
              function (err, result) {
                console.log(err);
              }
            );
          }
        );
      }
      user.profileimg = null;
      await user.save();
    } else {
      res.json({ message: "another user try to delete profile picture" });
    }
    res.status(200).json({ message: "profile image deleted succfuly" });
  } catch (err) {
    next(err);
  }
};

const getAllcourses = async (req, res, next) => {
  try {
    const Course = await Course.find();
    if (!Course) res.status(401).json({ message: "courses not found" });

    res.status(200).json(Course);
  } catch (err) {
    next(err);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Delete user's posts
    await Post.deleteMany({ user: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Remove the user from enrolledCourses in Course model
    await Course.updateMany({}, { $pull: { enroll: userId } });

    // Remove the user from doctorId in Assignment model
    await Assignment.updateMany({}, { $unset: { doctorId: userId } });

    // Delete assignment submissions related to the user
    await AssignmentSubmission.deleteMany({ userId: userId });

    // Remove the user from user field in Comment model
    await Comment.updateMany({}, { $unset: { user: userId } });

    res.json({ message: "User and related data removed successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = removeUser;

module.exports = {
  SignUp,
  getUsers,
  updateProfile,
  updateUser,
  deleteProfilePicture,
  enrolledCourses,
  getUserProfile,
  getAllcourses,
  removeUser,
  lecView: lecView,
};
