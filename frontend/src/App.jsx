import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
