import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const ChartComponent = ({ date, receivedData }) => {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [balance, setBalance] = useState();

  const { owner } = useParams();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`https://avengers-wallet-app.onrender.com/api/getfinances/${owner}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        const currency = data.data.currency;

        const filteredTransactions = data.data.transactions.filter((transaction) => {
          const transactionMonthYear = transaction.date.split(".").slice(1).join(".");
          const selectedMonthYear = date.split(".").join(".");
          return transactionMonthYear === selectedMonthYear;
        });
        const balance = filteredTransactions.reduce((acc, transaction) => {
          if (transaction.type === "+") {
            return acc + transaction.sum;
          } else if (transaction.type === "-") {
            return acc - transaction.sum;
          } else {
            return acc;
          }
        }, 0);

        setBalance(balance);
        const filteredTransactionsWithoutIncome = filteredTransactions.filter((transaction) => {
          return transaction.category !== "Income";
        });
        setCurrency(currency);

        setTransactions(filteredTransactionsWithoutIncome);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [date, owner, balance]);

  let statisticsCategory = [];
  let statisticsSum = [];

  transactions.forEach((el) => {
    // wyodrębnienie category i sum z obiektów
    let category = el.category;
    let sum = el.sum;

    // tworzenie tablicy statisticsCategory dla poszczególnych kategorii
    statisticsCategory.push(category);
    const uniqueCategory = new Set(statisticsCategory);
    const combinedCategory = Array.from(uniqueCategory);
    statisticsCategory = combinedCategory;

    // warunek który sprawdza czy dana kategoria istnieje. Jeżeli tak to sumuje sumy
    if (statisticsSum[category]) {
      statisticsSum[category] += sum;
    } else {
      statisticsSum[category] = sum;
    }
  });

  const statisticsData = Object.entries(statisticsSum).map(([category, sum]) => ({ category, sum }));

  const colors = statisticsData.map((el) => {
    let color;
    switch (el.category) {
      case "Main expenses":
        color = "#FED057";
        break;
      case "Products":
        color = "#FFD8D0";
        break;
      case "Car":
        color = "#FD9498";
        break;
      case "Self care":
        color = "#C5BAFF";
        break;
      case "Child care":
        color = "#6E78E8";
        break;
      case "Household products":
        color = "#4A56E2";
        break;
      case "Education":
        color = "#81E1FF";
        break;
      case "Leisure":
        color = "#24CCA7";
        break;
      case "Other":
        color = "#00AD84";
        break;
      default:
        color = "rgb(254, 208, 87)";
    }
    return color;
  });

  const userData = statisticsData.map((entry) => entry.sum);

  const data = {
    // legenda która wychodzi z tablicy z kategoriami
    labels: statisticsCategory,
    // dane
    datasets: [{ data: userData, backgroundColor: colors, borderWidth: 0 }],
  };

  const config = {
    cutout: "70%",
    responsive: true,
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  const balanceToFormat = formatter.format(balance);

  const formatedBalance = balanceToFormat.toLocaleString().replace(/,/g, " ");
  const chartText = {
    id: "chartText",
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;

      // ustalenie pozycji napisu na środku wykresu
      const xCenter = chart.getDatasetMeta(0)?.data?.[0]?.x;
      const yCenter = chart.getDatasetMeta(0)?.data?.[0]?.y;

      if (xCenter !== undefined && yCenter !== undefined) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${formatedBalance}`, xCenter, yCenter);
      }
    },
  };

  return (
    <Box>
      <Box className={styles.statisticsContainer}>
        <Doughnut key={balance} data={data} options={config} plugins={[chartText]} />
      </Box>
    </Box>
  );
};

export default ChartComponent;
