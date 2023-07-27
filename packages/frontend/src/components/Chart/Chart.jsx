import { Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

function Chart({ chartData }) {
	return (
		<Box>
			<div className="chart-container">
				<h2 style={{ textAlign: "center" }}>Chart</h2>
				<Doughnut
					data={chartData}
					options={{
						plugins: {
							// datasets: [],
							title: {
								display: true,
								text: "Users Gained between 2016-2020",
							},
						},
					}}
				/>
			</div>
		</Box>
	);
}

export default Chart;
