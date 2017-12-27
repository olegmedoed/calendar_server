const mongoose = require("mongoose");

module.exports = function() {
  const schema = mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    start: {
      type: Number,
      required: true
    }
  });

  mongoose.model("Event", schema);
};
