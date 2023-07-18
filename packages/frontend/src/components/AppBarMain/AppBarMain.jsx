// import React from "react";
import { Box, AppBar, Toolbar, Container } from "@mui/material";
import Navigation from "../../pages/Navigation/Navigation";
import useAuth from "../../hooks/useAuth";

function AppBarMain() {
	return (
		<AppBar position="relative">
			<Toolbar>
				<Box sx={{}}>
					<Navigation />
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default AppBarMain;
