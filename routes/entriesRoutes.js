const express = require("express");
const router = express.Router();

const {
  getEntries,
  postEntries,
  deleteEntries,
  editEntries,
} = require("../controllers/entriesController");

router.get("/", getEntries);

router.post("/", postEntries);

router.delete("/:id", deleteEntries);

router.put("/:id", editEntries);

module.exports = router;
