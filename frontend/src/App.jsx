import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
// CHANGE STATIC PATH TO "/" BEFORE DEPLOYING TO PROD!
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/static/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
