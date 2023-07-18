// import React from "react";
import { Box, AppBar, Toolbar } from "@mui/material";
import Navigation from "../../pages/Navigation/Navigation";

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
