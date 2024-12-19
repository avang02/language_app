import { useNavigate } from "react-router-dom";

import Japanese from "../LanguageAssets/japanese.json"

export default function LanguageLevel() {
  const navigate = useNavigate();


  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      {/* Header */}
      <h1 className="text-xl font-medium mb-4">Japanese Alphabet Levels</h1>

      {/* Maps japanese levels */}
      <div className="w-1/2 h-1/2 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 my-4">
            {Japanese.map((jap, index) => (
            <div key={index}>
                <button 
                  className="w-28 border border-black py-2 px-4 rounded-full hover:text-white hover:bg-black"
                  onClick={() => navigate("/japanesequiz", {state:{"index": index}})}
                >
                  {jap.name}
                </button>
            </div>
            ))}
        </div>
      </div>

    </div>
  )
}