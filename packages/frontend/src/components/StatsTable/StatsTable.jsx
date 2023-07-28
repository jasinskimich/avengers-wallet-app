import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchTransactionsData from "./StatsTableData";

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
      fontSize: "15px",
      color: "black",
      backgroundColor: "#FFFFFF",
      padding: "0",
      paddingLeft: "8px",
      borderBottom: "1px solid rgb(197, 196, 196)",
      borderRadius: "0",
      boxShadow: "none",
      textAlign: "left",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
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
    <>
      <form>
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
        />
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.category}</td>
                <td>{transaction.sum}</td>
              </tr>
            ))}
            <tr>
              <b>Expenses:</b> {expenseTotal}
            </tr>
            <tr>
              <b>Income:</b> {incomeTotal}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default StatsTable;
