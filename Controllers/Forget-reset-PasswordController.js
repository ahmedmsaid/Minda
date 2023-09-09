const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { User } = require("../Models/user-model");
const { Doctor } = require("../Models/doctor-model");
const ErrorResponse = require("../utils/errorResponse");
const Joi = require("joi");

const postResetDoc = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor) {
      return res.status(404).send("doctor not found!");
    }
    const token = parseInt(Math.random() * (999999 - 100000) + 100000);

    doctor.resetPasswordToken = token;
    doctor.resetPasswordExpires = Date.now() + 3600000;
    await doctor.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mindaplatform2023@gmail.com",
        pass: "atclecefklwnqgwz",
      },
    });
    transporter.sendMail({
      to: req.body.email,
      from: "mindaplatform2023@gmail.com",
      subject: "Password reset",
      html: `
        <p>You requested a password reset</p>
        <p>Verification code: ${token}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Check your email!",
    });
  } catch (err) {
    next(next);
  }
};
const postCheckTokenDoc = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!doctor) {
      return res.status(404).send("Invalid Token!");
    }
    return res.status(200).json({
      success: true,
      message: "Token is valid!",
    });
  } catch (err) {
    next(next);
  }
};
const postResetNewPasswordDoc = async (req, res, next) => {
  try {
    const { error } = validatePassword(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message));

    const doctor = await Doctor.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!doctor) {
      return res.status(404).send("Invalid Token!");
    }
    doctor.password = await bcrypt.hash(req.body.password, 12);
    doctor.resetPasswordToken = undefined;
    doctor.resetPasswordExpires = undefined;
    await doctor.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    next(next);
  }
};

const postReset = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found!");
    }
    const token = parseInt(Math.random() * (999999 - 100000) + 100000);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mindaplatform2023@gmail.com",
        pass: "atclecefklwnqgwz",
      },
    });
    transporter.sendMail({
      to: req.body.email,
      from: "mindaplatform2023@gmail.com",
      subject: "Password reset",
      html: `
        <p>You requested a password reset</p>
        <p>Verification code: ${token}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Check your email!",
    });
  } catch (err) {
    next(err);
  }
};
const postCheckToken = async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).send("Invalid Token!");
    }
    return res.status(200).json({
      success: true,
      message: "Token is valid!",
    });
  } catch (err) {
    next(err);
  }
};
const postResetNewPassword = async (req, res, next) => {
  try {
    const { error } = validatePassword(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message));

    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).send("Invalid Token!");
    }
    user.password = await bcrypt.hash(req.body.password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};
const validatePassword = (user) => {
  const schema = Joi.object({
    password: Joi.string()
      .required()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,}$"))
      .messages({
        "string.pattern.base":
          "Invalid password. It must contain at least one alphabetical character (either uppercase or lowercase), at least one digit, and have a minimum length of five characters.",
      }),
    token: Joi.string().required(), // Add validation for the "token" field
  });

  return schema.validate(user);
};

module.exports = {
  postCheckToken,
  postResetNewPasswordDoc,
  postCheckTokenDoc,
  postResetDoc,
  postReset,
  postResetNewPassword,
};
