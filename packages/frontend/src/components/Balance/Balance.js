import React from "react";
import css from "./Balance.module.css";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShowSettingsModal from "../BalanceSettingsModal/ShowSettingsModal";
import Notiflix from "notiflix";
import { Loader } from "../Loader/Loader";


const Balance = ({ balance }) => {
  const [currency, setCurrency] = useState("PLN");
  const [loading, setLoading] = useState(true);
  const { owner } = useParams();

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        // Simulating a 2-second loading delay using setTimeout
        setTimeout(async () => {
          let response = await fetch(
            `https://avengers-wallet-app.onrender.com/api/finances/currency/${owner}`,
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
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
        setLoading(false);
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
    Notiflix.Notify.success("Currency updated");
  };

  return (
    <Box className={css.balanceBox}>
      <p className={css.balanceTitle}>YOUR BALANCE</p>

      <div className={css.balanceContainer}>
        <div className={css.balanceContainerItems}>
          {loading ? (
            <Loader />
          ) : (
            <p className={css.balanceText}>
              {formatedBalance !== null ? formatedBalance : "Loading..."}
            </p>
          )}
          <ShowSettingsModal updateCurrency={updateCurrency} />
        </div>
      </div>
    </Box>
  );
};

export default Balance;
