import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchTransactionsData from "./StatsTableData";
import "./StatsTable.css";

const StatsTable = ({ date }) => {
  const { owner } = useParams();

  const [selectedFilter, setSelectedFilter] = useState();
  const [transactionsData, setTransactionsData] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const data = await fetchTransactionsData(owner);
        setTransactionsData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchTableData();
  }, [owner]);

  useEffect(() => {
    setSelectedFilter(date);
    setTableData([]);
  }, [date]);

  useEffect(() => {
    let transactionsByDate = [];
    let income = [];
    let expense = [];

    transactionsData.forEach((el) => {
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
  }, [selectedFilter, transactionsData]);

  useEffect(() => {
    let statisticsCategory = [];
    let statisticsSum = [];
    let incomeSum = 0;
    let expenseSum = 0;
    expenseTransactions.forEach((el) => {
      let category = el.category;
      let sum = el.sum;

      statisticsCategory.push(category);
      const uniqueCategory = new Set(statisticsCategory);
      const combinedCategory = Array.from(uniqueCategory);
      statisticsCategory = combinedCategory;
      if (statisticsSum[category]) {
        statisticsSum[category] += sum;
        expenseSum += sum;
      } else {
        statisticsSum[category] = sum;
      }
      setTableData(Object.entries(statisticsSum).map(([category, sum]) => ({ category, sum })));

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

  return (
    <div>
      <div>
        <table className="statsTable">
          <thead>
            <tr className="tableHeaders">
              <th>Category</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {tableData.map((el) => {
              // poprzedni kod do koloru
              // let color =
              // 	tableData[idx] === tableData[0]
              // 		? "#FFD8D0"
              // 		: tableData[idx] === tableData[1]
              // 		? "#FD9498"
              // 		: tableData[idx] === tableData[2]
              // 		? "#C5BAFF"
              // 		: tableData[idx] === tableData[3]
              // 		? "#6E78E8"
              // 		: tableData[idx] === tableData[4]
              // 		? "#4A56E2"
              // 		: tableData[idx] === tableData[5]
              // 		? "#81E1FF"
              // 		: tableData[idx] === tableData[6]
              // 		? "#24CCA7"
              // 		: tableData[idx] === tableData[7]
              // 		? "#00AD84"
              // 		: "#0fa35b";

              let index = el.category === "Main expenses" ? (el.index = 0) : el.category === "Products" ? (el.index = 1) : el.category === "Car" ? (el.index = 2) : el.category === "Self care" ? (el.index = 3) : el.category === "Child care" ? (el.index = 4) : el.category === "Household products" ? (el.index = 5) : el.category === "Education" ? (el.index = 6) : el.category === "Leisure" ? (el.index = 7) : el.category === "Other" ? (el.index = 8) : (el.index = 10);

              tableData.sort((a, b) => a.index - b.index);

              // nowy kod do koloru
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

              return (
                <tr className="tableRow" key={index}>
                  <td className="categoryRow">
                    <span style={{ backgroundColor: color, width: "28px", height: "28px", borderRadius: "5px" }} className="categorySquare"></span>
                    {el.category}
                  </td>
                  <td className="sumRow">{el.sum}</td>
                </tr>
              );
            })}
            <tr className="tableSummaryRow">
              <td>Expenses:</td>
              <td className="tableTotalExpense">{expenseTotal}</td>
            </tr>
            <tr className="tableSummaryRow">
              <td>Income:</td>
              <td className="tableTotalIncome">{incomeTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StatsTable;
