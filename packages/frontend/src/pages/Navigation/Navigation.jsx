import { Box, Button } from "@mui/material/";
import { NavLink } from "react-router-dom";

function Navigation() {
	return (
		<Box>
			<Button variant="contained" sx={{}} component={NavLink} to="/home">
				Home
			</Button>
			<Button variant="contained" sx={{}} component={NavLink} to="/statistics">
				Statistics
			</Button>
			<Button variant="contained" sx={{}} component={NavLink} to="/mobileTable">
				mobileTable
			</Button>
			<Button variant="contained" sx={{}} component={NavLink} to="/register">
				Logout
			</Button>
		</Box>
	);
}

export default Navigation;
