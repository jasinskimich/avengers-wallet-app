import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import { Currency } from "../../components/Currency/Currency";
import Stats from "../../components/Stats/Stats";
import css from "./Statistics.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
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

  return (
    <Box>
      <div className={css.backgroundShadow}>
        <div className={css.container}>
          <div className={css.containerLeft}>
            <div>
              <Navigation />
              <Balance balance={balance} />
            </div>
            <div className={css.containerCurrency}>
              <Currency />
            </div>
          </div>

          <div className={css.containerRight}>
            <Stats />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Statistics;
