const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;
const lecSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  decument: [
    {
      public_id: {
        //
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  img: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    defult: Date.now(),
  },
  doctorData: {
    doctorName: {
      type: String,
    },
    doctorId: {
      type: String,
    },
  },
  courseData: {
    courseName: {
      type: String,
    },
    courseId: {
      type: String,
    },
  },

  vedios: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
        default: "00:00:00",
      },
    },
  ],
});

const validateLec = (lec) => {
  const schema = Joi.object({
    title: Joi.string().required().min(1).max(255),
    description: Joi.string().required().min(1).max(1024),
    decument: Joi.array().items(
      Joi.object({
        public_id: Joi.string().required(),
        url: Joi.string().required(),
      })
    ),
    img: Joi.array().items(
      Joi.object({
        public_id: Joi.string().required(),
        url: Joi.string().required(),
      })
    ),
    doctorData: Joi.object({
      doctorName: Joi.string().required().min(1).max(255),
      doctorId: Joi.string().required().min(1).max(255),
    }),

    vedios: Joi.array().items(
      Joi.object({
        public_id: Joi.string(),
        url: Joi.string(),
      })
    ),
  });

  return schema.validate(lec);
};
module.exports = {
  Lec: mongoose.model("Lec", lecSchema),
  validateLec: validateLec,
};
