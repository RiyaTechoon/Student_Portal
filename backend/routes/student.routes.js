const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../controllers/student.controller");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/students", upload.single("photo"), controller.registerStudent);
router.get("/students", controller.getStudents);

module.exports = router;
