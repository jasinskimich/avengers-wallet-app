import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Balance = () => {
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

  return (
    <div>
      <h1>Your Balance</h1>
      <p>{balance !== null ? balance : "Loading..."}</p>
    </div>
  );
};

export default Balance;
