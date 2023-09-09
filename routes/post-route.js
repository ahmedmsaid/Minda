const router = require("express").Router();
const auth = require("../middlware/authMiddleware");
const admin = require("../middlware/adminMiddleware");
const { Course } = require("../Models/course-model");
const Post = require("../Models/post-model");
const Comment = require("../Models/comment-model");
router.post("/courses/:courseId/posts", [auth], async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id; // Assuming you have implemented user authentication

    // Check if the user is enrolled in the course
    const course = await Course.findOne({ _id: courseId, enroll: userId });

    if (!course) {
      return res
        .status(404)
        .json({ error: "User is not enrolled in the course." });
    }

    // Create a new post
    const { content } = req.body;

    const post = new Post({
      user: userId,
      content,
      course: courseId,
    });

    // Save the post
    await post.save();

    // Add the post's ID to the course's posts array
    course.posts.push(post._id);
    await course.save();

    res.status(201).json(
      post
      // _id: post._id,
      // user: post.user,
      // content: post.content,
      // course: post.course,
      // comments: post.comments,
      // createdAt: post.createdAt,
    );
  } catch (err) {
    next(err);
  }
});

// router.post("/courses/:courseId/posts", [auth], async (req, res, next) => {
//   try {
//     const courseId = req.params.courseId;
//     const userId = req.user.id; // Assuming you have implemented user authentication

//     // Check if the user is enrolled in the course
//     const course = await Course.findOne({ _id: courseId, enroll: userId });

//     if (!course) {
//       return res
//         .status(404)
//         .json({ error: "User is not enrolled in the course." });
//     }

//     // Create a new post
//     const { content } = req.body;

//     const post = new Post({
//       user: userId,
//       content,
//       course: courseId,
//     });

//     // Save the post
//     await post.save();

//     // Add the post's ID to the course's posts array
//     course.posts.push(post._id);
//     await course.save();

//     res.status(201).json(post);
//   } catch (err) {
//     next(err);
//   }
// });
router.get(
  "/courses/:courseId/posts/Mobile",
  [auth],
  async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const userId = req.user.id; // Assuming you have implemented user authentication

      // Check if the user is enrolled in the course
      const course = await Course.findOne({ _id: courseId, enroll: userId });

      if (!course) {
        return res
          .status(404)
          .json({ error: "User is not enrolled in the course." });
      }

      console.log(course);

      // Find all posts in the course created by the user and populate the user field
      const posts = await Post.find({
        course: courseId,
        user: userId,
      }).populate("user", "firstName lastName");

      const postsResponse = {
        posts: posts,
      };

      res.status(200).json({ postsResponse: postsResponse });
    } catch (err) {
      next(err);
    }
  }
);
router.get("/courses/:courseId/posts", [auth], async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id; // Assuming you have implemented user authentication

    // Check if the user is enrolled in the course
    const course = await Course.findOne({ _id: courseId, enroll: userId });

    if (!course) {
      return res
        .status(404)
        .json({ error: "User is not enrolled in the course." });
    }

    // Find all posts in the course created by the user and populate the user field
    const posts = await Post.find({ course: courseId, user: userId }).populate(
      "user",
      "firstName lastName"
    );

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});
router.get(
  "/courses/:courseId/posts/:postId",
  [auth],
  async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const postId = req.params.postId;
      const userId = req.user.id; // Assuming you have implemented user authenticatiom
      // Check if the user is enrolled in the course
      const course = await Course.findOne({ _id: courseId, enroll: userId });
      if (!course) {
        return res
          .status(404)
          .json({ error: "User is not enrolled in the course." });
      }
      // Find the specific post by post ID and user ID
      const post = await Post.findOne({ _id: postId, user: userId }).select(
        "content"
      );
      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }
      // Find all comments related to the post
      const comments = await Comment.find({ post: postId }).select("content");

      const response = {
        post: post,
        comments: comments,
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/courses/:courseId/posts/:postId",
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

      // Check if the post exists and belongs to the same course and user
      const post = await Post.findOne({
        _id: postId,
        course: courseId,
        user: userId,
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }

      // Delete the post
      await post.remove();

      // Delete all comments related to the post
      await Comment.deleteMany({ post: postId });

      res
        .status(200)
        .json({ message: "Post and its comments deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
