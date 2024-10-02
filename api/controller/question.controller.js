const Question = require("../models/question.model");

module.exports = {
  getAllQuestions,
  getOneQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}

async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

async function  getOneQuestion(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (question === null){
      return res.status(404).json({message: "Cannot find question"});
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

async function  createQuestion(req, res) {
  const question = new Question({
    question: req.body.question,
    category: req.body.category,
    answers: req.body.answers,
    correctAnswer: req.body.correctAnswer,
    explanation: req.body.explanation,
  });
  try {
    const questionExists = await Question.findOne({question: req.body.question});
    if (questionExists) {
      res.status(400).json({message: "Error: Question already exists"})
    } else {
      const newQuestion = await question.save();
      res.status(201).json(newQuestion);
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }

}

async function  updateQuestion(req, res) {
  let newQuestion = {};
  if (req.body.question != null) {
    newQuestion.newQuestion = req.body.question;
  }
  if (req.body.category != null) {
    newQuestion.newCategory = req.body.category;
  }
  if (req.body.answers != null) {
    newQuestion.newAnswers = req.body.answers;
  }
  if (req.body.correctAnswer != null) {
    newQuestion.newCorrectAnswer = req.body.correctAnswer;
  }
  if (req.body.explanation != null) {
    newQuestion.newExplanation = req.body.explanation;
  }
  try {
    const updateQuestion = await Question.findByIdAndUpdate(req.params.id, {
      question: newQuestion.newQuestion,
      category: newQuestion.newCategory,
      answers: newQuestion.newAnswers,
      correctAnswer: newQuestion.newCorrectAnswer,
      explanation: newQuestion.newExplanation,
    }, {new: true, runValidators: true});
    res.status(200).json(updateQuestion);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

async function  deleteQuestion(req, res) {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({message: "No page found."});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}