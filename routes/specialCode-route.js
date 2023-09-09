const router = require("express").Router();
const admin = require("../middlware/adminMiddleware");
const auth = require("../middlware/authMiddleware");

const {
  addCode,
  getCode,
  getallCodes,
  getallSpecialCode,
  getAllcourses,
} = require("../Controllers/specialCodeController");

router.post("/:id", [auth, admin], addCode);

router.get("/specialCode/:codeId/:adminId", [auth, admin], getCode);
router.get("/specialCode", [auth, admin], getallCodes);
router.get("/specialCodes", [auth, admin], getallSpecialCode);

module.exports = router;
