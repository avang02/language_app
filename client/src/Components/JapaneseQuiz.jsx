
import { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Japanese from "../LanguageAssets/japanese.json"

export default function JapaneseQuiz() {

  // Configure react-router-dom
  const location = useLocation();
  const route = location.state;
  const navigate = useNavigate();

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
  const [practice, setPractice] = useState(true);
  
  // These will be used as the "Correct Answers" for this game
  const index = route?.index;
  console.log(index)
  const englishContent = Japanese[index].contents.english;
  const japaneseContent = Japanese[index].contents.japanese;

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
  }, [practice]);

  function checkWin() {
    if (correctCount === japaneseContent.length-1) {
      setOpenGameOver(true);
    }
  }

  function checkCorrect() {
    const japIdx = japaneseContent.findIndex(jap => jap === randomizedJap[japSelect]);
    const engIdx = englishContent.findIndex(eng => eng === randomizedEng[engSelect]);

    if (!(japSelect === undefined && engSelect === undefined)) {
      if (japIdx === engIdx) {
        setCorrectCount((prevCount) => prevCount+1)
        setCorrectJap([...correctJap, japSelect]);
        setCorrectEng([...correctEng, engSelect]);
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
    setJapSelect();
    setEngSelect();
    checkWin();
  }

  // Function to reset quiz, maybe there is a way to compress this
  function reset() {
    setGameStart(false);
    setJapSelect();
    setEngSelect();
    setRandomizedEng();
    setRandomizedJap();
    setCorrectJap([]);
    setCorrectEng([]);
    setCorrectCount(0);
    setIsCorrect("");
    setOpenGameOver(false);
    setPractice((prev) => !prev);
  }

  function nextLevel() {
    reset();
    navigate("/japanesequiz", {state:{"index": index+1}});
  }

  // Modal for gameover to popup after quiz is complete
  const GameOverModal = () => (
    <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl">Nice job!</h1>
        <div className="flex justify-between w-full mt-20">
          <button className="border border-black rounded-2xl py-2 px-4 hover:bg-black hover:text-white" onClick={() => reset()}>Practice Again</button>
          <button className="border border-black rounded-2xl py-2 px-4 hover:bg-black hover:text-white" onClick={() => nextLevel()}>Next Level</button>
        </div>
    </div>
  )

  const MainGame = () => (
    <div className="relative flex flex-col w-full min-h-screen items-center justify-center gap-14">

      {/* Goes back to level selection */}
      <button 
        className="absolute left-10 top-10 text-2xl font-medium" 
        onClick={() => navigate("/languagelevel")}
      >
        Back
      </button>

      <h1 className="text-4xl font-medium">{Japanese[index].name}</h1>
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

        {/* Checks if the characters are correct and changes to game being completed */}
        {
          openGameOver ?
          <GameOverModal />
          :
          <button 
            className="w-fit text-3xl border border-black py-2 px-4 rounded-lg hover:bg-black hover:text-white"
            onClick={() => checkCorrect()}
          >
            Check
          </button>
        }
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