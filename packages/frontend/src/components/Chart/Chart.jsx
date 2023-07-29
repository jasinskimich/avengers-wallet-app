import { Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import fetchData from "../../components/Chart/ChartData";
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
	console.log(chartData);

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

	// ustawienia chart.js
	const data = {
		// legenda która wychodzi z tablicy z kategoriami
		labels: statisticsCategory,
		datasets: [
			{
				// dane z tablicy statisticsSum
				data: statisticsData.map((entry) => entry.sum),
				backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
				borderWidth: 1,
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
