import { Box } from "@mui/material";
import ShowModal from "../../components/ModalAddTransaction/ShowModal";
import Balance from "../../components/Balance/Balance";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage/DashboardPage";
import EuroChart from "../../components/ApiNbp/ApiNbp";
import Navigation from "../../components/Navigation/Navigation";
import styles from "./Home.module.css";
// import { Currency } from "../../components/Currency/Currency";

function Home() {
  const [balance, setBalance] = useState(null);

  const { owner } = useParams();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        let response = await fetch(`https://avengers-wallet-app.onrender.com/api/finances/sum/${owner}`, {
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

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  const [transactions, setTransactions] = useState(["adddaa"]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch(`https://avengers-wallet-app.onrender.com/api/finances/transactions/${owner}`, {
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
  const defaultSum = "0.00";
  const defaultComment = "Please insert comment";
  const defaultCategory = "Please select your category";
  return (
    <Box>
      <div className={styles.backgroundShadow}>
        <div className={styles.container}>
          <div className={styles.containerLeft}>
            <div>
              <Navigation />
              <Balance balance={balance} />
            </div>
            <div className={styles.containerCurrency}>
              {/* <Currency /> */}
              <EuroChart />
            </div>
          </div>

          <div className={styles.containerRight}>
            <div className={styles.homeButtonModal}>
              <ShowModal prevComment2={defaultComment} prevSum2={defaultSum} prevCategory2={defaultCategory} prevType2="+" updateBalance={updateBalance} updateTransactions={updateTransactions} />
            </div>
            <div className={styles.dashboardContainer}>
              <DashboardPage transactions={transactions} updateBalance={updateBalance} />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Home;
