import { Route, Routes } from "react-router-dom";

import Landing from "./Pages/Landing";
import CreateQuestion from "./Pages/CreateQuestion";
import AllQuestion from "./Pages/AllQuestion";
import ComptiaAPlusPorts from "./Components/ComptiaAPlusPorts";
import LanguageLevel from "./Pages/LanguageLevel";
import JapaneseQuiz from "./Components/JapaneseQuiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/createquestion" element={<CreateQuestion />} />
      <Route path="/getquestions" element={<AllQuestion />} />
      <Route path="/comptiaaplusports" element={<ComptiaAPlusPorts />} />
      <Route path="/languagelevel" element={<LanguageLevel />} />
      <Route path="/japanesequiz" element={<JapaneseQuiz />} />
    </Routes>
  );
}

export default App;
