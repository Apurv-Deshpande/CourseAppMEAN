const express = require("express");
const router = express.Router();

const Course = require("../models/Course");


exports.getCourses = (req, res) => {
  Course.find()
    .sort({ date: -1 })
    .then(courses => {
      res.status(200).json(courses);
    })
    .catch(error => res.status(500).json({
      message: "Fetching courses failed!"
    }))

};

exports.getCourse = (req, res) => {
  Course.findById(req.params.id)
    .then(course => {
      if (course) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ message: "Course not found!" });
      }

    })
    .catch(err =>
      res.status(500).json({ message: "Fetching course failed!" })
    );
};

exports.createCourse = (req, res) => {

  const course = new Course({
    title: req.body.title,

    published: req.body.published,
    tags: req.body.tags.split(","),
    youtube: req.body.youtube,
    creator: req.userData.userId
  });

  course.save().then(createdCourse => {
    res.status(201).json({
      message: "Course added successfully",
      course: {
        ...createdCourse,
        id: createdCourse._id
      }
    });
  }).catch(err =>
    res.status(500).json({
      message: "Creating a course failed!"
    })
  );
}



exports.updateCourse =


  (req, res) => {

    Course.updateOne({ _id: req.params.id, creator: req.userData.userId }, req.body)
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate post!"
        });
      });


  }



exports.deleteCourse =


  (req, res) => {
    Course.deleteOne({ _id: req.params.id, creator: req.userData.userId })
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({ message: "Deletion successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Deleting courses failed!"
        });
      });
  }





