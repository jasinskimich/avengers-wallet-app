import { useParams } from "react-router-dom";
import React, { useState } from "react";
import css from "./CurrencyForm.module.css";

const CurrencyForm = ({ updateCurrency, handleCloseModal }) => {
  const [currency, setCurrency] = useState("USD");
  const { owner } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://avengers-wallet-app.onrender.com/api/finances/currency/${owner}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currency }), // Pass the currency as an object
        }
      );

      if (response.ok) {
        const data = await response.json();
        const ownerCurrency = data.data.currency;
        updateCurrency(ownerCurrency);
        handleCloseModal();
      } else {
        throw new Error("Failed to update currency");
      }
    } catch (error) {
      console.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={css.currencyContainter}>
      <form onSubmit={handleSubmit} className={css.currencyForm}>
        <label htmlFor="currency">Select Currency:</label>
        <select
          className={css.round}
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNY">CNY</option>
          <option value="NZD">NZD</option>
          <option value="MXN">MXN</option>
          <option value="HKD">HKD</option>
          <option value="NOK">NOK</option>
          <option value="KRW">KRW</option>
          <option value="TRY">TRY</option>
          <option value="RUB">RUB</option>
          <option value="INR">INR</option>
          <option value="BRL">BRL</option>
          <option value="ZAR">ZAR</option>
          <option value="SEK">SEK</option>
          <option value="PLN">PLN</option>
        </select>
        <button type="submit" className={css.updateBtn}>Update Currency</button>
      </form>
    </div>
  );
};

export default CurrencyForm;
