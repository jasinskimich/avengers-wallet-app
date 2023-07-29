import { Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import fetchData from "../StatsTable/StatsTableData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Chart() {
	const { owner } = useParams();
	const [chartData, setChartData] = useState([]);

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

	// tablice dla kategorii i liczb (sum)
	let statisticsCategory = [];
	let statisticsSum = [];

	// wynik fetcha z bazą danych
	// console.log(chartData);

	// pętla dzielaca wynik fetcha na poszczególne obiekty
	chartData.forEach((el) => {
		// wyodrębnienie category i sum z obiektów
		let category = el.category;
		let sum = el.sum;

		// tworzenie tablicy statisticsCategory dla poszczególnych kategorii
		statisticsCategory.push(category);
		const uniqueCategory = new Set(statisticsCategory);
		const combinedCategory = Array.from(uniqueCategory);
		statisticsCategory = combinedCategory;

		// warunek który sprawdza czy dana kategoria istnieje. Jeżeli tak to sumuje sumy
		if (statisticsSum[category]) {
			statisticsSum[category] += sum;
		} else {
			statisticsSum[category] = sum;
		}
	});

	// przemiana statisticsSum
	const statisticsData = Object.entries(statisticsSum).map(([category, sum]) => ({ category, sum }));

	console.log(statisticsData);

	const colors = statisticsData.map((el) => {
		let color;
		switch (el.category) {
			case "Main expenses":
				color = "rgba(255, 216, 208)";
				break;
			case "Products":
				color = "rgb(253, 148, 152)";
				break;
			case "Car":
				color = "rgb(197, 186, 255)";
				break;
			case "Self care":
				color = "rgb(110, 120, 232)";
				break;
			case "Child care":
				color = "rgb(74, 86, 226)";
				break;
			case "Household products":
				color = "rgb(129, 225, 255)";
				break;
			case "Education":
				color = "rgb(36, 204, 167)";
				break;
			case "Leisure":
				color = "rgb(0, 173, 132)";
				break;
			case "Other":
				color = "rgb(15, 163, 91)";
				break;
			default:
				color = "rgb(254, 208, 87)";
		}
		return color;
	});

	// ustawienia chart.js
	const data = {
		// legenda która wychodzi z tablicy z kategoriami
		labels: statisticsCategory,
		datasets: [
			{
				data: statisticsData.map((entry) => entry.sum),
				backgroundColor: colors,
				borderWidth: 0,
			},
		],
	};

	return (
		<Box sx={{ width: 500 }}>
			<Box className="chart-container">
				<Doughnut
					data={data}
					options={{
						plugins: {},
					}}
				/>
			</Box>
		</Box>
	);
}

export default Chart;
