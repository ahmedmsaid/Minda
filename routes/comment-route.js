const router = require("express").Router();
const auth = require("../middlware/authMiddleware");
const admin = require("../middlware/adminMiddleware");
const { Course } = require("../Models/course-model");
const Post = require("../Models/post-model");
const Comment = require("../Models/comment-model");
// router.post(
//   "/courses/:courseId/posts/:postId/comments",
//   [auth],
//   async (req, res, next) => {
//     try {
//       const courseId = req.params.courseId;
//       const postId = req.params.postId;
//       const userId = req.user.id; // Assuming you have implemented user authentication

//       // Check if the user is enrolled in the course
//       const course = await Course.findOne({ _id: courseId, enroll: userId });

//       if (!course) {
//         return res
//           .status(404)
//           .json({ error: "User is not enrolled in the course." });
//       }

//       // Check if the post exists and belongs to the same course
//       const post = await Post.findOne({ _id: postId, course: courseId });

//       if (!post) {
//         return res.status(404).json({ error: "Post not found." });
//       }

//       // Create a new comment
//       const { content } = req.body;

//       const comment = new Comment({
//         user: userId,
//         post: postId,
//         content,
//       });

//       // Save the comment
//       await comment.save();

//       // Add the comment to the post's comments array
//       post.comments.push(comment);
//       await post.save();

//       res.status(201).json({
//         _id: comment._id,
//         user: comment.user,
//         post: comment.post,
//         content: comment.content,
//         createdAt: comment.createdAt,
//         __v: comment.__v,
//       });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

router.post(
  "/courses/:courseId/posts/:postId/comments",
  [auth],
  async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const postId = req.params.postId;
      const userId = req.user.id; // Assuming you have implemented user authentication

      // Check if the user is enrolled in the course
      const course = await Course.findOne({ _id: courseId, enroll: userId });

      if (!course) {
        return res
          .status(404)
          .json({ error: "User is not enrolled in the course." });
      }

      // Check if the post exists and belongs to the same course
      const post = await Post.findOne({ _id: postId, course: courseId });

      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }

      // Create a new comment
      const { content } = req.body;

      const comment = new Comment({
        user: userId,
        post: postId,
        content,
      });

      // Save the comment
      await comment.save();

      // Add the comment to the post's comments array
      post.comments.push(comment);
      await post.save();

      res.status(201).json({
        _id: comment._id,
        user: comment.user,
        content: comment.content,
        post: comment.post,
        createdAt: comment.createdAt,
      });
    } catch (err) {
      next(err);
    }
  }
);

//dlete commetn by user who create it
router.delete(
  "/courses/:courseId/posts/:postId/comments/:commentId",
  [auth],
  async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const postId = req.params.postId;
      const commentId = req.params.commentId;
      const userId = req.user.id; // Assuming you have implemented user authentication

      // Check if the user is enrolled in the course
      const course = await Course.findOne({ _id: courseId, enroll: userId });

      if (!course) {
        return res
          .status(404)
          .json({ error: "User is not enrolled in the course." });
      }

      // Check if the post exists and belongs to the same course
      const post = await Post.findOne({ _id: postId, course: courseId });

      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }

      // Check if the comment exists and belongs to the same post and user
      const comment = await Comment.findOne({
        _id: commentId,
        post: postId,
        user: userId,
      });

      if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
      }

      // Delete the comment
      await comment.remove();

      res.status(200).json({ message: "Comment deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/courses/:courseId/posts/:postId/comments",
  [auth],
  async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const postId = req.params.postId;
      const userId = req.user.id; // Assuming you have implemented user authentication

      // Check if the user is enrolled in the course
      const course = await Course.findOne({ _id: courseId, enroll: userId });

      if (!course) {
        return res
          .status(404)
          .json({ error: "User is not enrolled in the course." });
      }

      // Find the post and check if it belongs to the same course
      const post = await Post.findOne({ _id: postId, course: courseId });

      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }

      // Find all comments in the post and retrieve only their content
      const comments = await Comment.find();

      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/courses/:courseId/posts/:postId/comments/Mobile",
  [auth],
  async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const postId = req.params.postId;
      const userId = req.user.id; // Assuming you have implemented user authentication

      // Check if the user is enrolled in the course
      const course = await Course.findOne({ _id: courseId, enroll: userId });

      if (!course) {
        return res
          .status(404)
          .json({ error: "User is not enrolled in the course." });
      }

      // Find the post and check if it belongs to the same course
      const post = await Post.findOne({ _id: postId, course: courseId });

      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }

      // Find all comments in the post and retrieve only their content
      const comments = await Comment.find({ post: postId })
        .populate({
          path: "user",
          select: "firstName lastName",
        })
        .populate({
          path: "post",
          select: "course",
          match: { course: courseId },
        });

      const filteredComments = comments.filter(
        (comment) => comment.post !== null
      );

      const commentsResponse = {
        comments: filteredComments,
      };

      res.status(200).json({ commentsResponse: commentsResponse });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
