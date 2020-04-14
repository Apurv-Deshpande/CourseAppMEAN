const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  tags: {
    type: [String]
  },

  youtube: {
    type: String
  },

  published: {
    type: Date,
    default: Date.now
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
  }
}
);

module.exports = mongoose.model("Course", courseSchema);
