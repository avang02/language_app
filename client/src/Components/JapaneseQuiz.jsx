
import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

export default function JapaneseQuiz() {
  const location = useLocation();
  const route = location.state;

  const title = route.name;
  const japaneseContent = route.contents.japanese;
  const englishContent = route.contents.english;
  const [japSelect, setJapSelect] = useState();
  const [engSelect, setEngSelect] = useState();
  const [gameStart, setGameStart] = useState(false);
  

  useEffect(() => {
    let japaneseContentCopy = japaneseContent;
    let englishContentCopy = englishContent;
    let japCount = japaneseContent.length;
    let engCount = englishContent.length;
    while(japCount !== 0) {
      let randomJapIndex = Math.floor(Math.random() * japCount);
      let randomEngIndex = Math.floor(Math.random() * engCount);
      japCount--;
      engCount--;

      [japaneseContentCopy[japCount], japaneseContentCopy[randomJapIndex]] = [japaneseContentCopy[randomJapIndex], japaneseContentCopy[japCount]];
      [englishContentCopy[engCount], englishContentCopy[randomEngIndex]] = [englishContentCopy[randomEngIndex], englishContentCopy[engCount]];
    }
    setGameStart(true);
  }, [gameStart])


  if (!gameStart) {
    return <div>Loading...</div>
  } else {
  return (
  
  <div className="flex flex-col w-full min-h-screen items-center justify-center gap-14">
    <h1 className="text-4xl font-medium">{title}</h1>

    <div className="w-fit h-fit flex flex-col gap-20">
      {/* Japanese Contents */}
      <div className="flex gap-4">
        {japaneseContent.map((jap, idx)  => (
          <div key={idx}> 
            <button 
              className={`text-3xl border border-black py-2 px-4 rounded-lg ${japSelect === idx && "border-green-500 bg-green-200"} hover:bg-black hover:text-white `}
              onClick={() => setJapSelect(idx)}
            >
              {jap}
            </button>
          </div>
        ))}
      </div>

      {/* English Contents */}
      <div className="flex gap-4">
        {englishContent.map((eng, idx)  => (
          <div key={idx}> 
            <button 
              className={`text-3xl border border-black py-2 px-4 rounded-lg ${engSelect === idx && "border-green-500 bg-green-200"} hover:bg-black hover:text-white`}
              onClick={() => setEngSelect(idx)}
            >
              {eng}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
}