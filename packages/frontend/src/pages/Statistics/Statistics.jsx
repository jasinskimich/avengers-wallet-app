import { Box } from "@mui/material";
import Chart from "../../components/Chart/Chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import MediaQuery from "react-responsive";
import StatsTable from "../../components/StatsTable/StatsTable";
import Navigation from "../../components/Navigation/Navigation";
import css from "./Statistics.module.css";
import Balance from "../../components/Balance/Balance";
import { Currency } from "../../components/Currency/Currency";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
	const [balance, setBalance] = useState(null);
	const { owner } = useParams();

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

				response = await response.json();

				setBalance(response.sum);
			} catch (error) {
				console.error(error);
			}
		};

		fetchBalance();
	}, [owner]);

	return (
		<Box>
			<MediaQuery minWidth={769} maxWidth={2560}>
				<Navigation />
				<Box sx={{ m: 5 }}>
					<Box className={css.statsPage}>
						<Box sx={{ my: 15, mx: 8 }}>
							<Balance balance={balance} />
							<Currency />
						</Box>
						<Chart />
						<StatsTable />
					</Box>
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
			<MediaQuery minWidth={426} maxWidth={768}>
				<Box sx={{ position: "absolute" }}>
					<Navigation />
				</Box>
				<Box className={css.statsPageTablet}>
					<Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", mx: 5, marginBottom: 5, gap: "15px" }}>
						<Balance balance={balance} />
						<Currency />
					</Box>
					<Box>
						<h2>Statistics</h2>
						<Chart />
					</Box>
					<StatsTable />
				</Box>
			</MediaQuery>
		</Box>
	);
}

export default Statistics;
