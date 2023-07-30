import { Box } from "@mui/material";
import ShowModal from "../../components/ModalAddTransaction/ShowModal";
import Balance from "../../components/Balance/Balance";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage/DashboardPage";

import Navigation from "../../components/Navigation/Navigation";
import styles from "./Home.module.css";
import { Currency } from "../../components/Currency/Currency";

function Home() {
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
				console.log(response);
			} catch (error) {
				console.error(error);
			}
		};

		fetchBalance();
	}, [owner]);

	const updateBalance = (newBalance) => {
		setBalance(newBalance);
	};

	const [transactions, setTransactions] = useState(["adddaa"]);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				let response = await fetch(`http://localhost:5000/api/finances/transactions/${owner}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch balance");
				}

				response = await response.json();

				setTransactions(response.transactions);
			} catch (error) {
				console.error(error);
			}
		};
		fetchTransactions();
	}, [owner]);

	const updateTransactions = (newTranaction) => {
		setTransactions(newTranaction);
	};

	return (
		<Box>
			<div className={styles.container}>
				<div className={styles.containerLeft}>
					<Navigation />
					<Balance balance={balance} />
					<Currency />
				</div>

				<div className={styles.containerRight}>
					<DashboardPage transactions={transactions} />
					<ShowModal updateBalance={updateBalance} updateTransactions={updateTransactions} />
				</div>
			</div>
		</Box>
	);
}

export default Home;
