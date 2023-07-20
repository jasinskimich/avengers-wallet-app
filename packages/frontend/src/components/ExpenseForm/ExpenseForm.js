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
  ];

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isFocused ? "#ff6596" : "black",
      backgroundColor: state.isFocused ? "#FFFFFF" : "#fff1f6a2",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      fontFamily: "Open Sans",
      width: "416px",
      height: "50px",
      color: "black",
      backgroundColor: "#FFFFFF",
      paddingLeft: "10px",
      border: "none",
      borderBottom: "1px solid rgb(197, 196, 196)",
      borderRadius: "0",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = e.target.expense.value;
    const amount = e.target.amount.value;
    const date = e.target.date.value;
    const comment = e.target.comment.value;

    const data = { type: "expense", expense: expense, amount: amount, date: date, comment: comment };

    const { error } = ExpenseFormValidation(data);
    if (error) {
      if (!expense) {
        Notify.failure("Please select the category");
      }
      if (!amount) {
        Notify.failure("Please enter the amount");
      }
    } else {
      const newExpense = { data };
      console.log(newExpense);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form" method="post" action="">
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
      <div>
        <input className="expense-form__amount" name="amount" type="number" min="0" placeholder="0.00"></input>
        <DatePicker name="date" dateFormat="dd.MM.yyyy" selected={expenseDate} onChange={(date) => setExpenseDate(date)} />
      </div>
      <input name="comment" className="expense-form__comment" type="text" placeholder="Comment"></input>
      <button className="expense-form__button" type="submit" value="Submit">
        ADD
      </button>
    </form>
  );
};

export default ExpensesForm;
