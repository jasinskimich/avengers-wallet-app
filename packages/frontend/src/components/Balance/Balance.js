import React from "react";
import css from "./Balance.module.css";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShowSettingsModal from "../BalanceSettingsModal/ShowSettingsModal";

const Balance = ({ balance }) => {
  const [currency, setCurrency] = useState("PLN");
  const { owner } = useParams();

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/finances/currency/${owner}`,
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

        setCurrency(response.currency);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrency();
  }, [owner]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });
  
  const balanceToFormat = formatter.format(balance);
  const formatedBalance = balanceToFormat.toLocaleString().replace(/,/g, " ");

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <Box
    className={css.balanceBox}
      
    >
      <p className={css.balanceTitle}>YOUR BALANCE</p>

      <div className={css.balanceContainer}>
        <div>
          <p className={css.balanceText}>
            {formatedBalance !== null ? formatedBalance : "Loading..."}
          </p>
        </div>
        <ShowSettingsModal updateCurrency={updateCurrency} />
      </div>
    </Box>
  );
};

export default Balance;
