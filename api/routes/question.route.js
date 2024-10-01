const express = require("express");
const router = express.Router();
const { getAllQuestions, getOneQuestion, createQuestion, updateQuestion, deleteQuestion } = require("../controller/question.controller");

// All routes start with /api/question

// Get all
router.get("/", getAllQuestions);
// Get One
router.get("/:id", getOneQuestion);
// Create One
router.post("/create", createQuestion);
// Update One
router.patch("/update/:id", updateQuestion);
// Delete One
router.delete("/delete/:id", deleteQuestion);

module.exports = router;