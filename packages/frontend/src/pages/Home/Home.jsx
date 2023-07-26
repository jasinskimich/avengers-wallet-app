import { Box } from "@mui/material";
import ShowModal from "../../components/ModalAddTransaction/ShowModal";
import Balance from "../../components/Balance/Balance";
// import { useLocation, useParams } from "react-router-dom";
// import { useEffect } from "react";

function Home() {
	// const location = useLocation();

	// useEffect(() => {
	// 	console.log(location);
	// 	console.log(owner);
	// }, []);
	// const { owner } = useParams();
	return (
		<Box>
			<Balance />

			<h1>Home</h1>
			<p>Path to register or login "/register" , "/login"</p>
			<ShowModal />
		</Box>
	);
}

export default Home;
