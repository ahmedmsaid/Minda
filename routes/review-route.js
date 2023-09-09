const router = require("express").Router();
const auth=require('../middlware/authMiddleware')

const {
  addReview,
  getReview,
  getRateofCourse
} = require("../Controllers/reviewController");

router.post("/:courseId/reviews",[auth],addReview); 
router.get("/:id/reviews",[auth],getReview); 
router.get("/:id/averagerating",[auth],getRateofCourse);


module.exports=router;