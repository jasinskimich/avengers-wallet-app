import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from "chart.js";
import MediaQuery from "react-responsive";
import { Doughnut } from "react-chartjs-2";
import fetchData from "../StatsTable/StatsTableData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

function Chart() {
	const { owner } = useParams();
	const [balance, setBalance] = useState();
	const [chartData, setChartData] = useState([]);
	const [currency, setCurrency] = useState("USD");

	useEffect(() => {
		const fetchBalance = async () => {
			try {
				let response = await fetch(`http://localhost:5000/api/finances/sum/${owner}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch balance");
				}
				const res = await response.json();
				setBalance(res.sum);
			} catch (error) {
				console.error(error);
			}
		};
		const fetchCurrency = async () => {
			try {
				let response = await fetch(`http://localhost:5000/api/finances/currency/${owner}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch balance");
				}
				response = await response.json();
				setCurrency(response.currency);
			} catch (error) {
				console.error(error);
			}
		};
		const fetchChartData = async () => {
			try {
				const data = await fetchData(owner);
				setChartData(data);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchCurrency();
		fetchChartData();
		fetchBalance();
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

	// tablica z sumami
	const userData = statisticsData.map((entry) => entry.sum);

	// dane dla chart.js
	const data = {
		// legenda która wychodzi z tablicy z kategoriami
		labels: statisticsCategory,
		// dane
		datasets: [{ data: userData, backgroundColor: colors, borderWidth: 0 }],
	};

	const config = {
		cutout: "70%",
		responsive: true,
	};

	// napis na środku wykresu
	const chartText = {
		id: "chartText",
		beforeDatasetsDraw(chart) {
			const { ctx } = chart;

			// ustalenie pozycji napisu na środku wykresu
			const xCenter = chart.getDatasetMeta(0)?.data?.[0]?.x;
			const yCenter = chart.getDatasetMeta(0)?.data?.[0]?.y;

			if (xCenter !== undefined && yCenter !== undefined) {
				ctx.save();
				ctx.fillStyle = "black";
				ctx.font = "bold 18px Arial";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(`${currency} ${balance}`, xCenter, yCenter);
			}
		},
	};

	let updatedBalance;
	if (balance === undefined) {
		updatedBalance = userData.join();
		return updatedBalance;
	}

	return (
		<Box>
			<Box sx={{ width: "350px" }}>
				<Doughnut key={updatedBalance} data={data} options={config} plugins={[chartText]} />
			</Box>
		</Box>
	);
}

export default Chart;
