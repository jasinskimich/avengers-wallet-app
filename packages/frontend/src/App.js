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

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/register" element={<RegistrationPages />} />
				<Route path="/verify" element={<VerifyPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Layout />}>
					<Route path="/home/:owner" element={<Home />} />
					<Route path="/statistics/:owner" element={<Statistics />} />
					<Route path="/mobileTable/:owner" element={<MobileTable />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
