const Code = require("../Models/specialCode-model");
const { User } = require("../Models/user-model");

function getRandom(length) {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
}

const addCode = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const code = new Code({
      code: getRandom(9),
      emailadmin: user.email,
    });
    console.log(req.user.isAdmin);
    const savedcode = await code.save();
    res.json(savedcode);
  } catch (err) {
    next(err);
  }
};
const getallSpecialCode = async (req, res, next) => {
  try {
    const code = await Code.find();
    if (!code) return res.json({ message: "not have any codes" });

    res.status(200).json({ allcodes: code });
  } catch (err) {
    next(err);
  }
};
const getallCodes = async (req, res, next) => {
  try {
    const code = await Code.find();
    if (!code) return res.json({ message: "not have any codes" });

    res.status(200).json(code);
  } catch (err) {
    next(err);
  }
};

const getCode = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.adminId);
    const code = await Code.findById(req.params.codeId);
    if (!code) {
      return res.status(404).json({ message: "Special code not found" });
    }
    if (req.user.id == user._id) {
      res.json(code);
    } else {
      res
        .status(401)
        .json({ message: "not allow for you plz search for another code " });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCode,
  getCode,
  getallCodes,
  getallSpecialCode,
};
