const asyncHandler = require("express-async-handler");

// student schema
const Student = require("../lib/schema");

// get req to /api/entries
const getEntries = asyncHandler(async (req, res) => {
  const entries = await Student.find();

  res.status(200).json(entries);
});

// post req to /api/entries
const postEntries = asyncHandler(async (req, res) => {
  const { name, age, cgpa, attendence, phone } = req.body;
  if (!name || !age || !cgpa || !attendence, || !phone) {
    res.status(400);
    throw new Error("none of the fileds can be empty");
  }

  const check = await Student.findOne({ phone });

  if (check) {
    res
      .status(409)
      .json({ message: "entry with same credentials already exists" });
    throw new Error("entry with same credentials already exists");
  }

  const createStudent = await Student.create({
    name,
    age,
    cgpa,
    phone,
    attendence,
  });

  res.status(200).json(createStudent);
});

// delete req to /api/entries/:id
const deleteEntries = asyncHandler(async (req, res) => {
  const entryId = await Student.findById(req.params.id);
  if (!entryId) {
    res.status(400);
    throw new Error("Student entry does not exist");
  }

  const deletedEntry = await Student.findByIdAndDelete(entryId);

  res.status(200).json(deletedEntry);
});

// put req to /api/entries/:id
const editEntries = asyncHandler(async (req, res) => {
  const entryId = await Student.findById(req.params.id);
  if (!entryId) {
    res.status(400).json({ message: "Student entry does not exist" });
    throw new Error("Student entry does not exist");
  }

  const updatedEntry = await Student.findByIdAndUpdate(entryId, req.body);

  res.status(200).json(updatedEntry);
});

module.exports = {
  getEntries,
  postEntries,
  deleteEntries,
  editEntries,
};
