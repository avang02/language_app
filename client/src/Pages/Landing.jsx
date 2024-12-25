import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import japanese from "../LanguageAssets/japanese.json"
import axios from "axios";

export default function Landing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const getKanji = async () => {
      try {
        const response = await axios.post('http://localhost:5000/translate', {
          text: "わたし",
          targetLang: 'ja', // Targeting Japanese (Kanji)
        });
        console.log(response.data.translateText);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getKanji();
  }, []);

  if (!loading) {
    return (
  
      <div className="flex flex-col justify-center items-center min-w-screen min-h-screen">
        <h1 className="text-2xl font-medium">Welcome to QuizMe!</h1>
        <button className="text-xl border border-solid border-black rounded-2xl px-2 hover:bg-black hover:text-white" onClick={() => navigate("/languagelevel")}>Study Japanese</button>
      </div>
    );
  }
}