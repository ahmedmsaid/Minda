const { Course, validateCourse } = require("../Models/course-model");
const { Doctor } = require("../Models/doctor-model");
const Cloudinary = require("../utils/clouodinry");
const { Lecture } = require("../Models/lec-model");
const ErrorResponse = require("../utils/errorResponse");
const { User } = require("../Models/user-model");
const { Lec } = require("../Models/lec-model");

const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .select(
        "courseName doctorData description  reviews averageRating  duration"
      )
      .populate({
        path: "reviews",
        select: "title text rating",
      });
    if (course.doctorData.doctorId == req.user.id) {
      if (!course)
        return next(
          new ErrorResponse(`Cant find Cours with id ${req.params.id}`)
        );
      res.status(200).json(course);
    } else {
      new ErrorResponse(`unauthorized `);
    }
  } catch (err) {
    next(err);
  }
};

const searchAboutUser = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send("Course not found.");

    const quiz = course.getQuizById(req.params.quizId);
    if (!quiz) return res.status(404).send("Quiz not found.");

    console.log(quiz);
    const quizResponse = course.quizResponses.find((response) =>
      response.quizId.equals(quiz._id)
    );

    if (!quizResponse)
      return next(new ErrorResponse("Quiz response not found."));

    console.log(quizResponse.quizMark);

    const { firstName, lastName } = req.body;

    const user = await User.findOne({ firstName, lastName });
    if (!user) return next(new ErrorResponse("User not found."));

    const userQuiz = user.infoQuizs.find((q) => q.quizId == req.params.quizId);
    if (!userQuiz) return next(new ErrorResponse("User quiz not found."));

    const result = {
      quizMark: quizResponse.quizMark,
      userMark: quizResponse.marks,
    };

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};
const courseDet = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;
    const course = await Course.findById(courseId);
    console.log(course);
    if (course.doctorData.doctorId == userId) {
      const course = await Course.findOne({ _id: courseId })
        .populate({
          path: "quizzes",
          select: "quizname",
        })
        .populate({
          path: "lectureId",
          select: "title",
        })
        .select("lectureId quizzes");

      if (!course) {
        return next(
          new ErrorResponse(
            `User is not enrolled in course with id ${courseId}`,
            404
          )
        );
      }

      res.status(200).json(course);
    } else {
      res.send("fuck u");
    }
  } catch (err) {
    next(err);
  }
};
const courseDetails = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const course = await Course.findOne({ _id: courseId, enroll: userId })
      .populate({
        path: "quizzes",
        select: "quizname",
      })
      .populate({
        path: "lectureId",
        select: "title",
      })
      .select("lectureId quizzes");

    if (!course) {
      return next(
        new ErrorResponse(
          `User is not enrolled in course with id ${courseId}`,
          404
        )
      );
    }

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

const postCourse = async (req, res, next) => {
  try {
    const { error } = validateCourse(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message));

    let course = await Course.findOne({ courseName: req.body.courseName });
    if (course) return next(new ErrorResponse(`the coures already existed`));
    const doctor = await Doctor.findById(req.params.docId);
    course = new Course({
      courseName: req.body.courseName,
      doctorData: {
        firstName: doctor.firstName,
        doctorId: doctor._id,
      },
      description: req.body.description,
    });
    const newcourse = await course.save();
    console.log(newcourse._id);
    doctor.courses.push(newcourse._id);
    await doctor.save();
    res.status(200).json({ newcourse });
  } catch (err) {
    next(err);
  }
};
const updateCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorResponse("Cannot find this course"));
    }

    const userEmail = req.body.email; // Get the user email from the request body
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return next(new ErrorResponse("Cannot find this user"));
    }

    // Check if the requester is an admin
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .send("Access denied. Only admins can enroll users.");
    }

    if (user.enrolledCourses.includes(courseId)) {
      res.status(200).send("User is already enrolled in this course");
    } else {
      await user.updateOne({ $push: { enrolledCourses: courseId } });
      await course.updateOne({ $push: { enroll: user._id } });
      res.status(200).send("User enrolled in course");
    }
  } catch (err) {
    next(err);
  }
};
const getusersEnrolled = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate({
        path: "enroll",
        select: "firstName email lastName profileimg",
      })
      .select("enroll");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

// const updateCourse = async (req, res, next) => {
//   try {
//     const courseId = req.params.id;
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return next(new ErrorResponse("cant find this course"));
//     }

//     const userId = req.user.id;
//     const user = await User.findById(userId);
//     if (!user) {
//       return next(new ErrorResponse("cant find this use"));
//     }

//     if (user.enrolledCourses.includes(courseId)) {
//       await user.updateOne({ $pull: { enrolledCourses: courseId } });
//       await course.updateOne({ $pull: { enroll: userId } });
//       res.status(200).send("Unenrolled from course");
//     } else {
//       await user.updateOne({ $push: { enrolledCourses: courseId } });
//       await course.updateOne({ $push: { enroll: userId } });
//       res.status(200).send("Enrolled in course");
//     }
//   } catch (err) {
//     next(err);
//   }
// };
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "lectureId"
    );
    if (req.user.id == course.doctorData.doctorId) {
      if (!course)
        return next(
          new ErrorResponse(
            `Cant find Course with rhis id : ${req.params.courseId}`
          )
        );
      course.lectureId.map(async (lecture) => {
        await Lecture.findByIdAndDelete(lecture._id);
      });
      await Course.findByIdAndRemove(course);
      if (course.lectureId.length != 0) {
        Cloudinary.api.delete_resources_by_prefix(
          `E-learning/courses/${course.courseName}`,
          function (err) {
            if (err && err.http_code !== 404) {
              return callback(err);
            }
            Cloudinary.api.delete_folder(
              `E-learning/courses/${course.courseName}`,
              function (err, result) {
                console.log(err);
              }
            );
          }
        );
      }
      res.json({ message: "course delete successfully " });
    }
  } catch (err) {
    next(err);
  }
};
const getCourses = async (req, res) => {
  try {
    const course = await Course.find().select(
      "duration averageRating description courseName"
    );

    if (!course) return next(new ErrorResponse(`Cant find any Courses`));
    res.status(200).json({ course });
  } catch (err) {
    next(err);
  }
};
const getquizResponses = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorResponse("Course not found"));
    }
    const user = await User.findById(req.user._id);
    console.log(course.doctorData);
    if (course.doctorData && course.doctorData.doctorId === req.user.id) {
      const quizResponses = course.quizResponses;
      res.send(quizResponses);
    } else {
      return res
        .status(403)
        .send(
          "Unauthorized access. Only the course creator can create quizzes for the course."
        );
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching quiz responses.");
  }
};
const courseInfo = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const course = await Course.findOne({ _id: courseId, enroll: userId })
      .populate({
        path: "quizzes",
        select: "quizname",
      })
      .populate({
        path: "enroll",
        populate: {
          path: "profileimg",
          select: "url",
        },
        select: "url publicId firstName",
      })
      .populate({
        path: "lectureId",
        select: "title",
      })
      .populate({
        path: "assignments",
        select: "title description file doctorId",
      })
      .populate({
        path: "posts",
        populate: [
          {
            path: "comments",
            populate: [
              {
                path: "user",
                select: "firstName",
                populate: {
                  path: "profileimg",
                  select: "url",
                },
              },
            ],
          },
          {
            path: "user",
            select: "firstName profileimg",
            populate: {
              path: "profileimg",
              select: "url",
            },
          },
        ],
      })
      .select("lectureId quizzes doctorData courseName description");

    if (!course) {
      return next(
        new ErrorResponse(
          `User is not enrolled in the course with id ${courseId}`,
          404
        )
      );
    }

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

const courseInfomation = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const dpctorId = req.user.id;
    const course = await Course.findOne({ _id: courseId })
      .populate({
        path: "quizzes",
        select: "quizname",
      })
      .populate({
        path: "lectureId",
        select: "title",
      })
      .select("lectureId quizzes doctorData courseName description");
    if (dpctorId == course.doctorData.doctorId) {
      if (!course) {
        return next(
          new ErrorResponse(
            `User is not enrolled in course with id ${courseId}`,
            404
          )
        );
      }

      res.status(200).json(course);
    } else {
      return next(
        new ErrorResponse(
          `User is not enrolled in course with id ${courseId}`,
          404
        )
      );
    }
  } catch (err) {
    next(err);
  }
};
const UpdateCourseData = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const { courseName, description } = req.body;
    const doctorId = req.user.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.doctorData.doctorId !== doctorId) {
      return res.status(401).json({
        message: "Unauthorized: You are not the owner of this course",
      });
    }

    course.courseName = courseName;
    course.description = description;

    await course.save();

    // Update course data in all related lectures
    await Lec.updateMany(
      { "courseData.courseId": courseId },
      {
        $set: {
          "courseData.courseName": courseName,
          "courseData.courseId": courseId,
        },
      }
    );

    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getquizResponses,
  getCourse,
  postCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  courseDetails,
  searchAboutUser,
  courseDet,
  courseInfo,
  courseInfomation,
  UpdateCourseData,
  getusersEnrolled,
};
