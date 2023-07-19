import "./App.css";
import "./stylesheet/fonts.css";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Statistics from "./pages/Statistics/Statistics";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginPages/LoginPages";
import MobileTable from "./pages/MobileTable/MobileTable";

function App() {
	return (
		<div className="App">
			<Routes>
				Wallet App
				<Route path="/register" element={<RegistrationForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Layout />}>
					<Route path="/home" element={<Home />} />
					<Route path="/statistics" element={<Statistics />} />
					<Route path="/mobileTable" element={<MobileTable />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
