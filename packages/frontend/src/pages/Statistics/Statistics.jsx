import { Box } from "@mui/material";
// import Chart from "chart.js/auto";
import Chart from "../../components/Chart/Chart";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import fetchData from "../../components/Chart/ChartData";

// Chart.register(CategoryScale);
ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
	const { owner } = useParams();
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const fetchChartData = async () => {
			try {
				const data = await fetchData(owner);
				setChartData(data);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchChartData();
		// eslint-disable-next-line
	}, [owner]);
	console.log(chartData);
	// const [chartData, setChartData] = useState({
	// 	labels: myData.map((data) => data.year),
	// 	datasets: [
	// 		{
	// 			label: "Users Gained ",
	// 			data: myData.map((data) => data.userGain),
	// 			backgroundColor: ["rgba(75,192,192,1)", "&quot;#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"],
	// 			borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
	// 			borderWidth: 1,
	// 		},
	// 	],
	// });

	const data = {
		// labels: chartData.map((data) => data.year),
		labels: [1, 2, 3],
		datasets: [
			{
				label: "# of Votes",
				data: [12, 19, 3, 5, 2, 3],
				data: chartData,
				backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
				borderWidth: 1,
			},
		],
	};

	return (
		<Box>
			<Chart chartData={data} />
			<h1>staty</h1>
		</Box>
	);
}

export default Statistics;
