const express = require("express");

const CourseController = require("../controllers/courses");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, CourseController.createCourse);

router.put("/:id", checkAuth, CourseController.updateCourse);

router.get("", CourseController.getCourses);

router.get("/:id", CourseController.getCourse);

router.delete("/:id", checkAuth, CourseController.deleteCourse);

module.exports = router;
