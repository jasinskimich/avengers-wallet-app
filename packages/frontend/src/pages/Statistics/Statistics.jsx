import { Box } from "@mui/material";
import Chart from "../../components/Chart/Chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
	return (
		<Box>
			<Chart />
			<h1>staty</h1>
		</Box>
	);
}

export default Statistics;
