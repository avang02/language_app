const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {type: String, required: true},
  category: {type: String, required: true},
  answers: {type: [String], required: true},
  correctAnswer: {type: String, required: true},
  explanation: {type: String, required: false},
});

module.exports = mongoose.model("Question", QuestionSchema)