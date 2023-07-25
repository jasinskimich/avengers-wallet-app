import { Box, AppBar, Toolbar, Typography, Divider, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import exit from "../../images/exit.svg";

function AppBarMain() {
	return (
		<AppBar position="static">
			<Toolbar sx={{ height: 80, display: "flex", justifyContent: "flex-end", gap: 90 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Typography sx={{ fontSize: 40, fontWeight: 700, textShadow: "0px 2px 3px #000000" }}>Wallet</Typography>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Typography variant="body1">Name{}</Typography>

					<Divider orientation="vertical" variant="fullWidth" flexItem />
					<Button
						sx={{
							gap: 1,
							width: 80,
							height: 40,
						}}
						component={NavLink}
						to="/register">
						<img src={exit} alt="exit" />
						<Typography sx={{ position: "relative", top: 1, color: "text.gray" }}>Exit</Typography>
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default AppBarMain;
