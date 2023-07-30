import { Box } from "@mui/material";
import ShowModal from "../../components/ModalAddTransaction/ShowModal";
import Balance from "../../components/Balance/Balance";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage/DashboardPage";

function Home() {
  const [balance, setBalance] = useState(null);
  const { owner } = useParams();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/finances/sum/${owner}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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

  const [transactions, setTransactions] = useState([]);
  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/finances/transactions/${owner}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
      <Balance balance={balance} />
      <DashboardPage
        transactions={transactions}
        updateBalance={updateBalance}
      />
      <ShowModal
        updateBalance={updateBalance}
        updateTransactions={updateTransactions}
      
      />
    </Box>
  );
}

export default Home;
