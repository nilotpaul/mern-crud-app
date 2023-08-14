const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    cgpa: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },

    attendence: {
      type: Number,
      required: true,
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
