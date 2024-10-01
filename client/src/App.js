import { Route, Routes } from "react-router-dom";

import Landing from "./Pages/Landing";
import CreateQuestion from "./Pages/CreateQuestion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/createquestion" element={<CreateQuestion />} />
    </Routes>
  );
}

export default App;
