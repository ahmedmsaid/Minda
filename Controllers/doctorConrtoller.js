const { Doctor, validateDoctor } = require("../Models/doctor-model");
const Cloudinary = require("../utils/clouodinry");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");
const Code = require("../Models/specialCode-model");
const { Course } = require("../Models/course-model");
const { Lec } = require("../Models/lec-model");

const SignUp = async (req, res, next) => {
  try {
    const { error } = validateDoctor(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message));

    const { firstName, lastName, email, password, confirmPassword, code } =
      req.body;
    if (password !== confirmPassword)
      return next(new ErrorResponse("Passwords do not match"));

    let doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor) return next(new ErrorResponse(`email or pass omvalid `));
    const specialCode = await Code.findOne({ code: req.body.code });

    if (!specialCode || specialCode.emailDoc != "")
      return next(new ErrorResponse(`check you input data`));
    if (password !== confirmPassword) {
      return next(new ErrorResponse("Passwords do not match"));
    }

    doctor = new Doctor({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      code: code,
    });
    // const  newdoctor = new Doctor({
    //     firstName:req.body.firstName,
    //     lastName:req.body.lastName,
    //     email:req.body.email,
    //     password:req.body.password,
    //     confirmPassword:req.body.confirmPassword,
    //     code:req.body.code,

    // })

    const salt = await bcrypt.genSalt(10);
    specialCode.emailDoc = doctor.email;
    await specialCode.save();
    doctor.password = await bcrypt.hash(doctor.password, salt);
    doctor.confirmPassword = await bcrypt.hash(doctor.confirmPassword, salt);
    const saveddoctor = await doctor.save();
    res
      .header("x-auth-token", doctor.generateAuthToken())
      .status(200)
      .json({ saveddoctor });
  } catch (err) {
    next(err);
  }
};
const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId).populate(
      "courses"
    );
    if (!doctor) {
      return next(new ErrorResponse("Doctor not found"));
    }
    const doctorProfile = {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      courses: doctor.courses,
      profileimg: doctor.profileimg,
    };
    res.send(doctorProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
const updateDoctorData = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    const { firstName, lastName } = req.body;

    const doctor = await Doctor.findById(doctorId).populate("courses");
    if (!doctor) {
      return next(new ErrorResponse("Doctor not found"));
    }

    // Update doctor's first name and last name
    doctor.firstName = firstName;
    doctor.lastName = lastName;
    await doctor.save();

    // Update doctor's first name and last name in associated courses
    await Course.updateMany(
      { "doctorData.doctorId": doctorId },
      { $set: { "doctorData.firstName": firstName } }
    );

    // Update doctor's first name and last name in associated lectures
    await Lec.updateMany(
      { "doctorData.doctorId": doctorId },
      { $set: { "doctorData.doctorName": `${firstName}` } }
    );

    res.send(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    if (!doctors) return next(new ErrorResponse(`cant find any doctors`));
    res.json({ doctors });
  } catch (err) {
    next(err);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const cloudinary = await Cloudinary.uploader.upload(req.file.path, {
      folder: `/ProfileDoctor/${doctor._id}`,
    });

    const updateDoc = doctor;
    if (updateDoc.profileimg) {
      updateDoc.profileimg.public_id = cloudinary.public_id;
      updateDoc.profileimg.url = cloudinary.url;
    } else {
      updateDoc.profileimg = {
        public_id: cloudinary.public_id,
        url: cloudinary.url,
      };
    }

    const updateDoctors = await updateDoc.save();
    res.status(200).json({
      updateDoctors,
    });
  } catch (err) {
    next(err);
  }
};
// const updateDoctor = async (req, res, next) => {
//   try {
//     const updateData = await Doctor.findOneAndUpdate(
//       { id: req.params.docId },
//       {
//         $set: {
//           firstName: req.body.firstName,
//           lastName: req.body.firstName,
//         },
//       }
//     );
//     await updateData.save();
//     res.status(200).json({ message: "profile data updated success" });
//   } catch (err) {
//     next(err);
//   }
// };

const lecDetails = async (req, res, next) => {
  const doctorId = req.params.doctorId;
  const courseId = req.params.courseId;
  const lectureId = req.params.lectureId;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if the logged-in user is the same as the doctor who created the course
    if (doctorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this course" });
    }

    const lecture = await Lec.findOne({ _id: lectureId, courseId: courseId });
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    const videos = lecture.vedios;
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const deleteProfilePicture = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (doctor._id == req.user.id) {
      if (doctor.profileimg.length != 0) {
        Cloudinary.api.delete_resources_by_prefix(
          `/ProfileDoctor/${doctor._id}`,
          function (err) {
            if (err && err.http_code !== 404) {
              return callback(err);
            }
            Cloudinary.api.delete_folder(
              `/ProfileDoctor/${doctor._id}`,
              function (err, result) {
                console.log(err);
              }
            );
          }
        );
      }
      doctor.profileimg = null;
      await doctor.save();
    } else {
      res.json({ message: "another user try to delete profile picture" });
    }
    res.status(200).json({ message: "profile image deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  SignUp,
  getAllDoctors,
  updateProfile,
  updateDoctorData,
  getDoctorProfile,
  deleteProfilePicture,
  lecDetails,
};
