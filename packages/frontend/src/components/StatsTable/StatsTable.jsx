import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchTransactionsData from "./StatsTableData";
import "./StatsTable.css";

function StatsTable() {
  const { owner } = useParams();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedFilter, setSelectedFilter] = useState(``);
  const [transactionsData, setTransactionsData] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [finalTableData, setFinalTableData] = useState([]);

  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const yearOptions = [
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
  ];

  const categoryTable = [
    { category: "Main expenses", sum: "0" },
    { category: "Products", sum: "0" },
    { category: "Car", sum: "0" },
    { category: "Child care", sum: "0" },
    { category: "Household products", sum: "0" },
    { category: "Education", sum: "0" },
    { category: "Leisure", sum: "0" },
    { category: "Other expenses", sum: "0" },
  ];

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isFocused ? "#FF6596" : "black",
      backgroundColor: state.isFocused ? "#FFFFFF" : "#fff1f6a2",
      textAlign: "left",
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      fontFamily: "Open Sans",
      fontSize: "18px",
      color: "black",
      backgroundColor: "none",
      padding: "0",
      paddingLeft: "10px",
      paddingRight: "10px",
      border: "2px solid black",
      borderRadius: "30px",
      boxShadow: "none",
      textAlign: "left",
      height: "60px",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "black",
      minHeight: 4,
    }),
  };

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
    const filterValue = `${selectedMonth}.${selectedYear}`;
    setSelectedFilter(filterValue);
    setTableData([]);
  }, [selectedMonth, selectedYear]);

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
      <form className="dateForm">
        <Select
          defaultValue={monthOptions.filter((option) => option.value.includes(currentMonth))}
          placeholder={currentMonth}
          name="month"
          value={monthOptions.find((obj) => obj.value === selectedMonth)}
          onChange={(e) => {
            setSelectedMonth(e.value);
          }}
          className="monthSelect"
          options={monthOptions}
          styles={customStyles}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
        <Select
          defaultValue={yearOptions.filter((option) => option.value.includes(currentYear))}
          placeholder={currentYear}
          name="year"
          value={yearOptions.find((obj) => obj.value === selectedYear)}
          onChange={(e) => {
            setSelectedYear(e.value);
          }}
          className="yearSelect"
          options={yearOptions}
          styles={customStyles}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </form>
      <div>
        <table className="statsTable">
          <thead>
            <tr className="tableHeaders">
              <th>Category</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {tableData.map((el, idx) => {
              let color = tableData[idx] === tableData[0] ? "#FFD8D0" : tableData[idx] === tableData[1] ? "#FD9498" : tableData[idx] === tableData[2] ? "#C5BAFF" : tableData[idx] === tableData[3] ? "#6E78E8" : tableData[idx] === tableData[4] ? "#4A56E2" : tableData[idx] === tableData[5] ? "#81E1FF" : tableData[idx] === tableData[6] ? "#24CCA7" : "#00AD84";
              let index = el.category === "Main expenses" ? (el.index = 0) : el.category === "Products" ? (el.index = 1) : el.category === "Car" ? (el.index = 2) : el.category === "Self care" ? (el.index = 3) : el.category === "Child care" ? (el.index = 4) : el.category === "Household products" ? (el.index = 5) : el.category === "Education" ? (el.index = 6) : el.category === "Leisure" ? (el.index = 7) : el.category === "Other" ? (el.index = 8) : (el.index = 10);

              tableData.sort((a, b) => a.index - b.index);
              return (
                <tr className="tableRow" key={idx}>
                  <td className="categoryRow">
                    <div style={{ backgroundColor: color, width: "28px", height: "28px", borderRadius: "5px" }} className="categorySquare"></div>
                    {el.category}
                  </td>
                  <td className="sumRow">{el.sum}</td>
                </tr>
              );
            })}
            <tr className="tableSummaryRow">
              <div>Expenses:</div>
              <div className="tableTotalExpense">{expenseTotal}</div>
            </tr>
            <tr className="tableSummaryRow">
              <div>Income:</div>
              <div className="tableTotalIncome">{incomeTotal}</div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default StatsTable;
