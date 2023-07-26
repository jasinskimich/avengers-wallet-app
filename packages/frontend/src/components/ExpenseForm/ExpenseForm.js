import { useState } from "react";
import "./ExpenseForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import Select from "react-select";
import ExpenseFormValidation from "../FormValidation/ExpenseFormValidation";
import { Notify } from "notiflix";

const ExpensesForm = () => {
  const yourDate = new Date();
  const [expenseDate, setExpenseDate] = useState(yourDate);
  const [selectedValue, setSelectedValue] = useState(null);

  const options = [
    { value: "main-expenses", label: "Main expenses" },
    { value: "products", label: "Products" },
    { value: "car", label: "Car" },
    { value: "self-care", label: "Self care" },
    { value: "child-care", label: "Child care" },
    { value: "household-products", label: "Household products" },
    { value: "education", label: "Education" },
    { value: "leisure", label: "Leisure" },
    { value: "other", label: "Other" },
  ];

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isFocused ? "#ff6596" : "black",
      backgroundColor: state.isFocused ? "#FFFFFF" : "#fff1f6a2",
      textAlign: "left",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      fontFamily: "Open Sans",
      fontSize: "15px",
      width: "365px",
      height: "40px",
      color: "black",
      backgroundColor: "#FFFFFF",
      padding: "0",
      paddingLeft: "8px",
      border: "none",
      borderBottom: "1px solid rgb(197, 196, 196)",
      borderRadius: "0",
      boxShadow: "none",
      textAlign: "left",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = e.target.expense.value;
    const amount = e.target.amount.value;
    const date = e.target.date.value;
    const comment = e.target.comment.value;

    const transaction = { date: date, type: "-", category: expense, comment: comment, sum: parseInt(amount) };

    const { error } = ExpenseFormValidation(transaction);
    if (error) {
      if (!expense) {
        Notify.failure("Please select the category");
      }
      if (!amount) {
        Notify.failure("Please enter the amount");
      }
    } else {
      const newExpense = { transaction };
      console.log(newExpense);
      try {
        const response = await fetch("http://localhost:5000/api/finances", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newExpense }),
        });
        if (response.ok) {
          console.log(response.body);
        }
      } catch (error) {
        console.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expenseForm" method="post" action="">
      <Select
        placeholder="Select a category"
        name="expense"
        value={options.find((obj) => obj.value === selectedValue)}
        onChange={(e) => {
          setSelectedValue(e.value);
        }}
        className="expenseSelect"
        options={options}
        styles={customStyles}
      />
      <div className="expenseForm__line">
        <input className="expenseForm__amount" name="amount" type="number" min="0" placeholder="0.00"></input>
        <div>
          <DatePicker className="expenseForm__date" name="date" dateFormat="dd.MM.yyyy" selected={expenseDate} onChange={(date) => setExpenseDate(date)} />
        </div>
      </div>
      <input name="comment" className="expenseForm__comment" type="text" placeholder="Comment"></input>
      <button className="expenseForm__button" type="submit" value="Submit">
        ADD
      </button>
    </form>
  );
};

export default ExpensesForm;
