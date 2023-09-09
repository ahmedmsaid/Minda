require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlware/globalMiddleware");
const errorResponse = require("./utils/errorResponse");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", require("./routes/user-router.js"));
app.use("/api/auth", require("./routes/auth-route"));
app.use("/api/course", require("./routes/course-route"));
app.use("/api/lecture", require("./routes/lecture-route"));
app.use("/api/question", require("./routes/questions-route"));
app.use("/api/quiz", require("./routes/quiz-route"));
app.use("/api/doctor", require("./routes/doctor-route"));
app.use("/api/specialCode", require("./routes/specialCode-route"));
app.use("/api/review", require("./routes/review-route"));
app.use("/api/notification", require("./routes/notification-route"));
app.use("/api/forgetPass", require("./routes/forgetresetPassword.js"));
app.use("/api/assignment", require("./routes/assignment-route"));
app.use("/api/post", require("./routes/post-route"));
app.use("/api/comment", require("./routes/comment-route"));

app.all("*", (req, res, next) => {
  next(new errorResponse(`Cant find this Route ::${req.originalUrl}`, 400));
});
app.use(errorHandler);
const url =
  "mongodb+srv://max:10112000@cluster0.xdpxd.mongodb.net/Elearning?retryWrites=true&w=majority";
const port = 3000;
mongoose
  .connect(url, {})
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`the sever run in ${port}`);
});
