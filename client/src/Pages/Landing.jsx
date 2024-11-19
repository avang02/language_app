import { useNavigate } from "react-router-dom";
import japanese from "../JapaneseAssets/japanese.json"

export default function Landing() {
  const navigate = useNavigate();
  console.log(japanese)

  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen">
      <h1 className="text-2xl font-medium">Welcome to QuizMe!</h1>
      <button className="text-xl border border-solid border-black rounded-2xl px-2 hover:bg-black hover:text-white" onClick={() => navigate("/createquestion")}>Create Question</button>
      <button className="text-xl border border-solid border-black rounded-2xl px-2 hover:bg-black hover:text-white" onClick={() => navigate("/comptiaaplusports")}>CompTIA A+ Ports Quiz</button>
      <div className="grid grid-cols-3 gap-2 my-4">
        {japanese.map((jap, index) => (
          <div key={index}>
            <button className="w-28 border border-black py-2 px-4 rounded-full hover:text-white hover:bg-black">{jap.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}