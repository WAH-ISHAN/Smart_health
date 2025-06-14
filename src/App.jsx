import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./Component/AdminPanal/AdminHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminHome/*" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
