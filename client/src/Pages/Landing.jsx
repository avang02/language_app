import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen">
      <h1 className="text-2xl font-medium">Welcome to QuizMe!</h1>
      <button className="text-xl border border-solid border-black rounded-2xl px-2 hover:bg-black hover:text-white" onClick={() => navigate("/createquestion")}>Create Question</button>
      <button className="text-xl border border-solid border-black rounded-2xl px-2 hover:bg-black hover:text-white" onClick={() => navigate("/comptiaaplusports")}>CompTIA A+ Ports Quiz</button>

    </div>
  );
}