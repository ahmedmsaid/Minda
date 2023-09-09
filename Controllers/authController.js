const Joi = require("joi"); //val
const bcrypt = require("bcrypt"); //hashing
const { User } = require("../Models/user-model");
const { Doctor } = require("../Models/doctor-model");
const ErrorResponse = require("../utils/errorResponse");

doctorLogin=async (req, res, next) => {
    try {
      const { error } = validatex(req.body);
      if (error) return next(new ErrorResponse(error.details[0].message));
  
      let doctor = await Doctor.findOne({ email: req.body.email });
      if (!doctor) return next(new ErrorResponse(`email or password invalid`));
      const validPassword = await bcrypt.compare(
        req.body.password,
        doctor.password
      );
      if (!validPassword)
        return next(new ErrorResponse(`email or password invalid`));
      res.json(doctor.generateAuthToken());
    } catch (err) {
      next(err);
    }
  };
  userLogin=async (req, res, next) => {
    try {
      const { error } = validatex(req.body);
      if (error) return next(new ErrorResponse(error.details[0].message));
      //find user by one of his attributes
      let user = await User.findOne({ email: req.body.email });
      if (!user) return next(new ErrorResponse(`Email or Password invalid!!`));
  
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return next(new ErrorResponse(`Email or Password invalid!!`));
      res.json(user.generateAuthToken());
    } catch (err) {
      next(err);
    }
  };
  




  const validatex = (user) => {
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,}$")),
    });
  
    return schema.validate(user);
  };





module.exports = {
    doctorLogin,
    userLogin
  };