
import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

export default function JapaneseQuiz() {
  const location = useLocation();
  const route = location.state;
  const title = route.name;

  // These will be used as the "Correct Answers" for this game
  const japaneseContent = route.contents.japanese;
  const englishContent = route.contents.english;

  const [japSelect, setJapSelect] = useState();
  const [engSelect, setEngSelect] = useState();
  const [randomizedJap, setRandomizedJap] = useState();
  const [randomizedEng, setRandomizedEng] = useState();
  const [correctJap, setCorrectJap] = useState([]);
  const [correctEng, setCorrectEng] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState("");
  const [openGameOver, setOpenGameOver] = useState(false);
  

  useEffect(() => {
    let japaneseContentCopy = [...japaneseContent];
    let englishContentCopy = [...englishContent];
    let japCount = japaneseContent.length;
    let engCount = englishContent.length;

    // Randomizes the array
    while(japCount !== 0) {
      let randomJapIndex = Math.floor(Math.random() * japCount);
      let randomEngIndex = Math.floor(Math.random() * engCount);
      japCount--;
      engCount--;

      [japaneseContentCopy[japCount], japaneseContentCopy[randomJapIndex]] = [japaneseContentCopy[randomJapIndex], japaneseContentCopy[japCount]];
      [englishContentCopy[engCount], englishContentCopy[randomEngIndex]] = [englishContentCopy[randomEngIndex], englishContentCopy[engCount]];
    }
    setRandomizedJap([...japaneseContentCopy]);
    setRandomizedEng([...englishContentCopy])
    setGameStart(true);
  }, [])

  function checkWin() {
    if (correctCount === japaneseContent.length) {
      setOpenGameOver(true);
    }
  }

  function checkCorrect() {
    const japIdx = japaneseContent.findIndex(jap => jap === randomizedJap[japSelect]);
    const engIdx = englishContent.findIndex(eng => eng === randomizedEng[engSelect]);

    if (japIdx === engIdx) {
      setCorrectCount(correctCount+1)
      setCorrectJap([...correctJap, japSelect]);
      setCorrectEng([...correctEng, engSelect]);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setJapSelect();
    setEngSelect();
    checkWin();
  }

  const MainGame = () => (
    <div className="flex flex-col w-full min-h-screen items-center justify-center gap-14">
      <h1 className="text-4xl font-medium">{title}</h1>

      <h1 className="text-4xl font-medium">Score: {correctCount}/5</h1>

      <div className="w-fit h-fit flex flex-col gap-20">
        {/* Japanese Contents */}
        <div className="flex gap-4">
          {randomizedJap.map((jap, idx)  => (
            <div key={idx}> 
              <button 
                className={`text-3xl border border-black py-2 px-4 rounded-lg ${(japSelect === idx || correctJap.includes(idx)) && "border-green-500 bg-green-200 pointer-events-none"} hover:bg-black hover:text-white `}
                onClick={() => setJapSelect(idx)}
              >
                {jap}
              </button>
            </div>
          ))}
        </div>

        {/* English Contents */}
        <div className="flex gap-4">
          {randomizedEng.map((eng, idx)  => (
            <div key={idx}> 
              <button 
                className={`text-3xl border border-black py-2 px-4 rounded-lg ${(engSelect === idx || correctEng.includes(idx)) && "border-green-500 bg-green-200 pointer-events-none"} hover:bg-black hover:text-white`}
                onClick={() => setEngSelect(idx)}
              >
                {eng}
              </button>
            </div>
          ))}
        </div>

        <h1 className={`${isCorrect==="" && "invisible"} ${isCorrect ? "text-green-600" : "text-red-600"} text-3xl`}>{`${isCorrect ? "Correct!" : "Wrong! Try again."}`}</h1>

        {/* Checks if the characters are correct */}
        <button 
          className="w-fit text-3xl border border-black py-2 px-4 rounded-lg hover:bg-black hover:text-white"
          onClick={() => checkCorrect()}
        >
          Check
        </button>
      </div>
    </div>
  )

  // Loads the page
  if (!gameStart) {
    return <div>Loading...</div>
  } else {
  return (
    <MainGame />
  );
}
}