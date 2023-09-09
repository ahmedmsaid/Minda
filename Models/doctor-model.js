const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Schema = mongoose.Schema;
const doctorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 0,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 0,
    max: 255,
  },
  code: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    max: 255,
  },
  password: {
    type: String,
    required: [
      true,
      "assword must contain at least one letter ([A-Za-z]) and one digit (\\d), and must be at least 5 characters long ({5,}",
    ],
    minlength: 5,
    maxlength: 1500,
  },
  confirmPassword: {
    type: String,
    required: [
      true,
      "assword must contain at least one letter ([A-Za-z]) and one digit (\\d), and must be at least 5 characters long ({5,}",
    ],
    minlength: 5,
    maxlength: 1500,
  },
  name: {
    type: String,
  },
  profileimg: {
    public_id: {
      //
      type: String,
    },
    url: {
      type: String,
    },
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
doctorSchema.methods.generateAuthToken = function () {
  //return token idd and when admin it will return id and isAdmin:true
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, "privateKey"); //returns token
};
const validateDoctor = (doctor) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(1).max(255),
    lastName: Joi.string().required().min(1).max(255),
    code: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,}$")),
    confirmPassword: Joi.string()
      .required()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,}$")),
    name: Joi.string(),
    profileimg: Joi.object({
      public_id: Joi.string(),
      url: Joi.string(),
    }),
    courses: Joi.array().items(Joi.string()),
  });

  return schema.validate(doctor);
};

module.exports = {
  Doctor: mongoose.model("Doctor", doctorSchema),
  validateDoctor: validateDoctor,
};
