import "./App.css";
import "./stylesheet/fonts.css";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Statistics from "./pages/Statistics/Statistics";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginPages/LoginPages";
import MobileTable from "./pages/MobileTable/MobileTable";
import RegistrationPages from "./pages/RegistrationPages/RegistrationPages";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import { useParams } from "react-router-dom";

function App() {

  let { id } = useParams();
  return (
    <div className="App">
      <Routes>
        Wallet App
        <Route path="/register" element={<RegistrationPages />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path={`/home/:${id}`} element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/mobileTable" element={<MobileTable />} />
        </Route>
      </Routes>
    </div>
  );

}

export default App;
