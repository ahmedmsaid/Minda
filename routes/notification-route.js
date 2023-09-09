

const {sendNotify}=require('../utils/sendNotifications')
// const {Notification}=require('../Models/notification-model')
const Course=require('../Models/course-model')
const express = require('express');
const router = express.Router();

router.post('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    const description = `Lecture has been updated in course "${course._id}".`;
    const notifications = await sendNotify(course._id.toString(), description);
    if (notifications) {
      return res.json({ message: "Notify send success", notifications });
    } else {
      res.json({ message: "Notify error" });
    }
  });
  

module.exports=router