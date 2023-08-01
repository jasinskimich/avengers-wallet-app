import { Box } from "@mui/material";
import ShowModal from "../../components/ModalAddTransaction/ShowModal";
import Balance from "../../components/Balance/Balance";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage/DashboardPage";

import Navigation from "../../components/Navigation/Navigation";
import styles from "./Home.module.css";
import { Currency } from "../../components/Currency/Currency";
import Notiflix from "notiflix";

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
    Notiflix.Notify.success("Transaction successfully edited");
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
              <Currency />
            </div>
          </div>

          <div className={styles.containerRight}>
            <div>
              <DashboardPage transactions={transactions} updateBalance={updateBalance} />
            </div>
            <div className={styles.homeButtonModal}>
              <ShowModal prevComment2={defaultComment} prevSum2={defaultSum} prevCategory2={defaultCategory} prevType2="+" updateBalance={updateBalance} updateTransactions={updateTransactions} />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Home;
