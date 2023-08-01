import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import fetchTransactionsData from "../StatsTable/StatsTableData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const Chart = ({ date = "08.2023" }) => {
  const { owner } = useParams();

  const [selectedFilter, setSelectedFilter] = useState();
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("USD");

  const [transactionsChartData, setTransactionsChartData] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const [chartData, setChartData] = useState([]);

  const [datas, setDatas] = useState({});
  const [category, setCategory] = useState({});
  const [config, setConfig] = useState({});
  const [chartText, setChartText] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await fetchTransactionsData(owner);
        setTransactionsChartData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    const fetchCurrency = async () => {
      try {
        let response = await fetch(`http://localhost:5000/api/finances/currency/${owner}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }
        response = await response.json();
        setCurrency(response.currency);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChartData();
    fetchCurrency();
  }, [owner]);

  useEffect(() => {
    console.log(date);
    setSelectedFilter(date);
    setChartData([]);
    setCategory([]);
    setIncomeTotal(0);
    setExpenseTotal(0);
  }, [date]);

  useEffect(() => {
    let transactionsByDate = [];
    let income = [];
    let expense = [];

    // pętla dodająca wydatki do tablicy expenseTransactions i przychody do tablicy incomeTransactions
    transactionsChartData.forEach((el) => {
      if (el.date.includes(selectedFilter)) {
        transactionsByDate.push(el);
      }
    });
    transactionsByDate.forEach((el) => {
      let type = el.type;

      if (type === "+") {
        income.push(el);
      } else if (type === "-") expense.push(el);
    });
    setExpenseTransactions(expense);
    setIncomeTransactions(income);
  }, [selectedFilter, transactionsChartData]);

  useEffect(() => {
    let statisticsCategory = [];
    let statisticsSum = [];
    let incomeSum = 0;
    let expenseSum = 0;
    console.log(expenseTransactions);

    // pętla dzielaca tablice expenseTransactions na poszczególne obiekty
    expenseTransactions.forEach((el) => {
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
        expenseSum += sum;
      } else {
        statisticsSum[category] = sum;
      }

      // przemiana statisticsSum
      setChartData(Object.entries(statisticsSum).map(([category, sum]) => ({ category, sum })));

      setCategory(statisticsCategory);

      if (statisticsSum[category] === "Income") {
        incomeSum += sum;
      } else if (statisticsSum[category] !== "Income") {
        expenseSum += sum;
      }
    });
    incomeTransactions.forEach((el) => {
      let sum = el.sum;
      incomeSum += sum;
    });
    setExpenseTotal(expenseSum);
    setIncomeTotal(incomeSum);
  }, [expenseTransactions, incomeTransactions]);

  useEffect(() => {
    const colors = chartData.map((el) => {
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
          color = "rgb(15, 163, 91)";
          break;
        default:
          color = "rgb(254, 208, 87)";
      }
      return color;
    });

    // tablica z sumami
    const userData = chartData.map((entry) => entry.sum);

    const statsData = {
      // legenda która wychodzi z tablicy z kategoriami
      labels: category,
      // dane
      datasets: [{ data: userData, backgroundColor: colors, borderWidth: 0 }],
    };

    setDatas(statsData);

    const config = {
      cutout: "70%",
      responsive: true,
    };

    setConfig(config);

    // napis na środku wykresu
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
          ctx.fillText(`${currency} ${expenseTotal - incomeTotal}`, xCenter, yCenter);
        }
      },
    };

    setChartText(chartText);

    let updatedBalance;
    if (balance === undefined) {
      updatedBalance = userData.join();
      setBalance(updatedBalance);
    }
  }, [chartData, incomeTotal, expenseTotal]);

  return (
    <>
      <Box sx={{ width: "350px" }}>
        <Doughnut key={balance} data={datas} options={config} plugins={[chartText]} />
      </Box>
    </>
  );
};

export default Chart;
