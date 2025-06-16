import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./Component/AdminPanal/AdminHome";
import LoginPage from "./Component/Login/Login";
import Register from "./Component/Login/Register";
import Home from "./Component/Home/HomePage";
import { Userpage } from "./Component/Home/Userpage";
import {TopSelections} from "./Component/Home/TopSelections";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route path="/" element={<Home />} />
        <Route path="/" element={<AdminHome />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Userpage" element={<Userpage />} />
        <Route path="/AdminHome/*" element={<AdminHome />} />
        <Route path="/TopSlct" element={<TopSelections/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
