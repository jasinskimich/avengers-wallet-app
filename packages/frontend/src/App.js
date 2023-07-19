import "./App.css";
import "./stylesheet/fonts.css";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Statistics from "./pages/Statistics/Statistics";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginPages/LoginPages";
import MobileTable from "./pages/MobileTable/MobileTable";
import RegistrationPages from "./pages/RegistrationPages/RegistrationPages";
import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";



function App() {
	return (
		<div className="App">
			<Routes>
				Wallet App
				<Route path="/register" element={<RegistrationPages />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Layout />}>
					<Route path="/home" element={<Home />} />
					<Route path="/statistics" element={<Statistics />} />
					<Route path="/mobileTable" element={<MobileTable />} />
				</Route>
			</Routes>
  <ModalAddTransaction />
		</div>
	);

}

export default App;
