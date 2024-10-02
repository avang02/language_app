import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateQuestion() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  const navigate = useNavigate();

  const handleAnswerChange = (idx, value) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/question/create", {
        question,
        category,
        answers,
        correctAnswer,
        explanation
      });
      console.log("Question created: ", response.data);
      setQuestion("");
      setCategory("");
      setAnswers(["","","",""]);
      setCorrectAnswer("");
      setExplanation("");
    } catch (error) {
      console.error("Error craeting question: ", error.response.data);
    }
  }

  return (
    <div className="relative flex items-center justify-center w-screen h-screen">
      <button className="absolute top-10 left-10 border border-solid border-black rounded-full px-2" onClick={() => navigate(-1)}>{"<"}</button>
      <form className="flex flex-col w-1/2 gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
            <label>Category: </label>
            <input
                className="border border-solid border-black"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
        </div>
        <div className="flex flex-col">
          <label>Question: </label>
          <textarea 
            className="border border-solid border-black h-24"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Answers: </label>
          <div className="flex flex-col gap-4">
            {answers.map((answer, idx) => (
              <textarea
                className="border border-solid border-black"
                key={idx}
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                required
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <label>Correct Answer: </label>
          <select
            className="border border-solid border-black"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          >
            {answers.map((answer, idx) => (
              <option key={idx} value={answer}>{answer}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label>Explanation: </label>
          <textarea
            className="border border-solid border-black h-40"
            type="text"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>
        <button className="border border-solid w-fit border-black rounded-2xl py-2 px-4 hover:text-white hover:bg-black" type="submit">Create Question</button>
      </form>
    </div>
  )
}