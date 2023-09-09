const filestack = require("filestack-js");
const client = filestack.init("AoNcitcC6TyisQb61Bz9Wz");
const auth = require("../middlware/authMiddleware");
const express = require("express");
const router = express.Router();
const { Course } = require("../Models/course-model");
const Assignment = require("../Models/assinment-model");
const AssignmentSubmission = require("../Models/assignmentSubmission-model");
const Upload = require("../utils/multer");

//get assignments by doctor create them
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Find assignments by doctorId
    const assignments = await Assignment.find({ doctorId }).select(
      " title  description file"
    );

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});
//get req for mobile app get all assignment for user that enroll in specfic course
router.get(
  "/course/:courseId/doctor/:doctorId/allassignments",
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const doctorId = req.params.doctorId;

      // Find the course by courseId and check if it belongs to the specified doctor
      const course = await Course.findOne({
        _id: courseId,
        "doctorData.doctorId": doctorId,
      });
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Find assignments in the specified course
      const assignmentsData = await Assignment.find({
        _id: { $in: course.assignments },
      }).select("title description file");

      res.status(200).json({ allAssignments: { assignmentsData } });
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  }
);
router.get(
  "/course/:courseId/doctor/:doctorId/assignments",
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const doctorId = req.params.doctorId;

      // Find the course by courseId and check if it belongs to the specified doctor
      const course = await Course.findOne({
        _id: courseId,
        "doctorData.doctorId": doctorId,
      });
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Find assignments in the specified course
      const assignments = await Assignment.find({
        _id: { $in: course.assignments },
      }).select("title description file");

      res.status(200).json(assignments);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  }
);

router.get(
  "/course/:courseId/user/:userId/allassignments",
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const userId = req.params.userId;

      // Find the course by courseId and check if the user is enrolled
      const course = await Course.findOne({ _id: courseId, enroll: userId });
      if (!course) {
        return res
          .status(404)
          .json({ error: "Course not found or user not enrolled" });
      }

      // Find assignments in the specified course
      const assignmentsData = await Assignment.find({
        _id: { $in: course.assignments },
      }).select("title description file");

      res.status(200).json({ allAssignments: { assignmentsData } });
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  }
);
//get all assignment for user enroll in related course
router.get("/course/:courseId/user/:userId/assignments", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.params.userId;

    // Find the course by courseId and check if the user is enrolled
    const course = await Course.findOne({ _id: courseId, enroll: userId });
    if (!course) {
      return res
        .status(404)
        .json({ error: "Course not found or user not enrolled" });
    }

    // Find assignments in the specified course
    const assignments = await Assignment.find({
      _id: { $in: course.assignments },
    }).select("title description file");

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

//get specific assignment
router.get("/doctor/:doctorId/assignment/:assignmentId", async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const assignmentId = req.params.assignmentId;

    // Find the assignment by assignmentId and doctorId
    const assignment = await Assignment.findOne({
      _id: assignmentId,
      doctorId: doctorId,
    }).select("title  description file");

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.status(200).json(assignment);
  } catch (error) {
    console.error("Failed to fetch assignment:", error);
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
});
//get all assignment response in specifc course///////////////////////
router.get(
  "/courses/:courseId/assignments/:assignmentId/responses",
  [auth],
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const assignmentId = req.params.assignmentId;
      const doctorId = req.user.id;

      // Find the course by courseId
      const course = await Course.findById(courseId);

      // Check if the doctor is authorized to access assignment responses in this course
      if (course.doctorData.doctorId !== doctorId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      // Find the assignment by assignmentId
      const assignment = await Assignment.findById(assignmentId).populate(
        "assignmentResponses.userId",
        "firstName lastName _id"
      );

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      // Filter assignment responses by doctor's assignment
      const assignmentResponses = assignment.assignmentResponses;

      res.status(200).json({ assignmentResponses });
    } catch (error) {
      console.error("Failed to get assignment responses:", error);
      res.status(500).json({ error: "Failed to get assignment responses" });
    }
  }
);

// POST route to create an assignment by the doctor who created the course
router.post(
  "/courses/:courseId/assignments",
  [auth],
  Upload.single("assignmentFile"),
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const { title, description } = req.body;
      const doctorId = req.user.id; // Assuming you have authenticated the doctor and stored the doctor's ID in the req.user object

      // Find the course by courseId
      const course = await Course.findById(courseId);

      // Check if the doctor is authorized to create assignments for this course
      if (course.doctorData.doctorId.toString() !== doctorId.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      // Upload the file to Filestack
      const fileUrl = await uploadFile(req.file.path);
      console.log("req.file", req.file);
      console.log(fileUrl);
      // Create a new assignment
      const newAssignment = new Assignment({
        title,
        description,
        file: fileUrl,
        doctorId,
      });

      // Add the assignment to the course's assignments array
      course.assignments.push(newAssignment);
      await course.save();
      await newAssignment.save();
      res.status(201).json(newAssignment);
    } catch (error) {
      console.error("Failed to create assignment:", error);
      res.status(500).json({ error: "Failed to create assignment" });
    }
  }
);
router.post(
  "/courses/:courseId/assignments/:assignmentId/submit",
  [auth],
  Upload.single("answerFile"),
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const assignmentId = req.params.assignmentId;
      const userId = req.user.id; // Assuming the user is authenticated and the user ID is stored in req.user

      // Find the course by courseId
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Check if the user is enrolled in the course
      if (!course.enroll.includes(userId)) {
        return res
          .status(403)
          .json({ error: "User is not enrolled in the course" });
      }

      // Find the assignment by assignmentId
      const assignment = await Assignment.findById(assignmentId);

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      // Check if the user has already submitted the assignment
      const existingSubmission = assignment.submissions.find(
        (submission) => submission.userId.toString() === userId.toString()
      );
      if (existingSubmission) {
        return res
          .status(403)
          .json({ error: "User has already submitted the assignment" });
      }

      const fileUrl = await uploadFile(req.file.path);
      // Create a new assignment submission
      const newSubmission = new AssignmentSubmission({
        assignmentId,
        userId,
        answerFile: fileUrl, // Assuming you store the file path as the answerFile
      });

      // Add the submission to the assignment's submissions array
      assignment.submissions.push(newSubmission);
      await assignment.save();
      await newSubmission.save();

      res.status(201).json(newSubmission);
    } catch (error) {
      console.error("Failed to create assignment submission:", error);
      res.status(500).json({ error: "Failed to create assignment submission" });
    }
  }
);

//submision by user taht only enroll in this course
// router.post(
//   "/courses/:courseId/assignments/:assignmentId/submit",
//   [auth],
//   Upload.single("answerFile"),
//   async (req, res) => {
//     try {
//       const courseId = req.params.courseId;
//       const assignmentId = req.params.assignmentId;
//       const userId = req.user.id; // Assuming the user is authenticated and the user ID is stored in req.user

//       // Find the course by courseId
//       const course = await Course.findById(courseId);

//       if (!course) {
//         return res.status(404).json({ error: "Course not found" });
//       }

//       // Check if the user is enrolled in the course
//       if (!course.enroll.includes(userId)) {
//         return res
//           .status(403)
//           .json({ error: "User is not enrolled in the course" });
//       }

//       // Find the assignment by assignmentId
//       const assignment = await Assignment.findById(assignmentId);

//       if (!assignment) {
//         return res.status(404).json({ error: "Assignment not found" });
//       }
//       const fileUrl = await uploadFile(req.file.path);
//       // Create a new assignment submission
//       const newSubmission = new AssignmentSubmission({
//         assignmentId,
//         userId,
//         answerFile: fileUrl, // Assuming you store the file path as the answerFile
//       });

//       // Add the submission to the assignment's submissions array
//       assignment.submissions.push(newSubmission);
//       await assignment.save();
//       await newSubmission.save();

//       res.status(201).json(newSubmission);
//     } catch (error) {
//       console.error("Failed to create assignment submission:", error);
//       res.status(500).json({ error: "Failed to create assignment submission" });
//     }
//   }
// );
//get answers of users by doctor who create it
router.get(
  "/courses/:courseId/assignments/:assignmentId/answers",
  [auth],
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const assignmentId = req.params.assignmentId;
      const doctorId = req.user.id; // Assuming the doctor is authenticated and the doctor ID is stored in req.user

      // Find the course by courseId and doctorId
      const course = await Course.findOne({
        _id: courseId,
        "doctorData.doctorId": doctorId,
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Find the assignment by assignmentId and doctorId
      const assignment = await Assignment.findOne({
        _id: assignmentId,
        doctorId,
        _id: { $in: course.assignments }, // Make sure the assignment belongs to the course
      });

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      // Find all the submissions for the assignment
      const submissions = await AssignmentSubmission.find({
        assignmentId,
      }).populate({
        path: "userId",
        select: "lastName firstName",
      });

      res.status(200).json(submissions);
    } catch (error) {
      console.error("Failed to retrieve assignment answers:", error);
      res.status(500).json({ error: "Failed to retrieve assignment answers" });
    }
  }
);

router.delete("/assignments/:assignmentId", [auth], async (req, res, next) => {
  try {
    const assignmentId = req.params.assignmentId;

    // Find the assignment by ID
    const assignment = await Assignment.findById(assignmentId);
    console.log("ass", assignment);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    console.log("id", req.user.id);
    // Find the course that the assignment belongs to
    const course = await Course.findOne({
      assignments: assignmentId,
      "doctorData.doctorId": req.user.id, // Assuming you have the doctor's ID in req.user.id
    });

    if (!course) {
      return res
        .status(403)
        .json({ message: "Forbidden: You cannot delete this assignment" });
    }

    // Remove the assignment and its related data
    await assignment.remove();

    // Remove the assignment from the course's assignments array
    course.assignments.pull(assignmentId);
    await course.save();

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    next(error);
  }
});
//wait here z3aam
router.post(
  "/courses/:courseId/assignments/:assignmentId/score",
  [auth],
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const assignmentId = req.params.assignmentId;
      const { userId, score } = req.body;
      const doctorId = req.user.id;

      // Find the course by courseId
      const course = await Course.findById(courseId);

      // Check if the doctor is authorized to score assignments in this course
      if (course.doctorData.doctorId.toString() !== doctorId.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      // Find the assignment by assignmentId
      const assignment = await Assignment.findById(assignmentId);

      // Find the user's assignment response
      const existingResponseIndex = assignment.assignmentResponses.findIndex(
        (res) =>
          res.submissionId.toString() === assignmentId.toString() &&
          res.userId.toString() === userId.toString()
      );

      if (existingResponseIndex !== -1) {
        return res
          .status(400)
          .json({ error: "Score already given for this user's assignment" });
      }

      // Find the user's assignment submission
      const submission = await AssignmentSubmission.findOne({
        assignmentId: assignmentId,
        userId: userId,
      });

      if (!submission) {
        return res
          .status(404)
          .json({ error: "User's assignment submission not found" });
      }

      // Add the score to the assignment response
      assignment.assignmentResponses.push({
        userId: userId,
        submissionId: submission._id,
        score: score,
      });

      await assignment.save();

      res.status(200).json({ message: "Score updated successfully" });
    } catch (error) {
      console.error("Failed to update score:", error);
      res.status(500).json({ error: "Failed to update score" });
    }
  }
);

router.get(
  "/course/:courseId/assignment/:assignmentId",
  [auth],
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const userId = req.user.id;
      const assignmentId = req.params.assignmentId;
      console.log("assignmentId", assignmentId);

      // Find the course by courseId and check if the user is enrolled
      const course = await Course.findOne({
        _id: courseId,
        enroll: userId,
      });
      if (!course) {
        return res
          .status(404)
          .json({ error: "Course not found or user not enrolled" });
      }

      // Find the assignment within the course
      const assignment = await Assignment.findOne({
        _id: assignmentId,
        doctorId: course.doctorData.doctorId,
        _id: { $in: course.assignments },
        $and: [{ _id: assignmentId }, { _id: { $in: course.assignments } }],
      }).select("title description file doctorId");

      if (!assignment) {
        return res
          .status(404)
          .json({ error: "Assignment not found in the specified course" });
      }

      res.status(200).json(assignment);
    } catch (error) {
      console.error("Failed to fetch assignment:", error);
      res.status(500).json({ error: "Failed to fetch assignment" });
    }
  }
);
///update score from docto use
router.put(
  "/courses/:courseId/assignments/:assignmentId/score",
  [auth],
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const assignmentId = req.params.assignmentId;
      const userId = req.body.userId; // User ID of the user who submitted the assignment
      const score = req.body.score; // Updated score

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      if (course.doctorData.doctorId == req.user.id) {
        const assignment = course.assignments.find(
          (assignment) => assignment._id.toString() === assignmentId.toString()
        );
        if (!assignment) {
          return res.status(404).json({ error: "Assignment not found" });
        }

        const assignmentResponse = assignment.assignmentResponses.find(
          (response) => response.userId.toString() === userId.toString()
        );
        if (!assignmentResponse) {
          return res
            .status(404)
            .json({ error: "Assignment response not found" });
        }

        // Update the score
        assignmentResponse.score = score;

        await course.save();

        res.json({ message: "Score updated successfully" });
      } else {
        return res.json({ message: "not related to this course" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// Function to upload file to Filestack
const uploadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    client
      .upload(filePath)
      .then((result) => {
        const fileUrl = result.url;
        resolve(fileUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = router;
