import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";
import StatsTable from "../StatsTable/StatsTable";
import ChartComponent from "../Chart/Chart";
import "./Stats.css";

const Stats = () => {
  const currentDate = new Date();
  let currentMonth = (currentDate.getMonth() + 1).toString();
  currentMonth = currentMonth.padStart(2, "0");
  const currentYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedFilter, setSelectedFilter] = useState(
    `${currentMonth}.${currentYear}`
  );
  const [monthBalance, setMonthBalance] = useState("0");

  const handleData = (receivedData) => {
    setMonthBalance(receivedData);
  };

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
    const filterValue = `${selectedMonth}.${selectedYear}`;
    setSelectedFilter(filterValue);
  }, [selectedMonth, selectedYear]);

  return (
    <div className="containerStats">
      <div className="chartContainer">
        <h2 className="statisticsTitle">Statistics</h2>
        <ChartComponent date={selectedFilter} receivedData={monthBalance} />
      </div>
      <div className="statsDate">
        <div className="dateFormBox">
          <form className="dateForm">
            <Select
              defaultValue={monthOptions.filter((option) =>
                option.value.includes(currentMonth)
              )}
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
              defaultValue={yearOptions.filter((option) =>
                option.value.includes(currentYear)
              )}
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
        </div>

        <div className="statsBox">
          <StatsTable date={selectedFilter} sendData={handleData} />
        </div>
      </div>
    </div>
  );
};
export default Stats;
