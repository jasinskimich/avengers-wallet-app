import { Box } from "@mui/material";
import Chart from "../../components/Chart/Chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import MediaQuery from "react-responsive";
import StatsTable from "../../components/StatsTable/StatsTable";
import Navigation from "../../components/Navigation/Navigation";
import css from "./Statistics.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
	return (
		<Box>
			<MediaQuery minWidth={426} maxWidth={2560}>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Navigation />
					<div className={css.statsPage}>
						<Chart />
						<StatsTable />
					</div>
				</Box>
			</MediaQuery>
			<MediaQuery minWidth={320} maxWidth={425}>
				<Box className={css.statsPageMobile}>
					<Navigation />
					<h2>Statistics</h2>
					<Chart />
					<StatsTable />
				</Box>
			</MediaQuery>
		</Box>
	);
}

export default Statistics;
