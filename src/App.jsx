import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./Component/AdminPanal/AdminHome";
import LoginPage from "./Component/Login/Login";
import Register from "./Component/Login/Register";
import Home from "./Component/Home/HomePage";
import { Userpage } from "./Component/Home/Userpage";
import HospitalList from "./Component/Home/HospitalList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminHome/*" element={<AdminHome />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Userpage" element={<Userpage />} />
        <Route path="/HospitalList/*" element={<HospitalList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
