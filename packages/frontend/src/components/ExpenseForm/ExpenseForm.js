import { useState } from "react";
import "./ExpenseForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import Select from "react-select";
import ExpenseFormValidation from "../FormValidation/ExpenseFormValidation";
import { Notify } from "notiflix";
import { useParams } from "react-router-dom";



const ExpensesForm = ({ updateBalance, updateTransactions, id, setOpenModal, setOpenEditModal, prevSum, prevComment, prevCategory, prevComment2, prevSum2, prevCategory2 }) => {

  const yourDate = new Date();
  const [expenseDate, setExpenseDate] = useState(yourDate);
  const [selectedValue, setSelectedValue] = useState(null);
  const { owner } = useParams();

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
      color: "black",
      backgroundColor: "#FFFFFF",
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

    const expense = selectedValue.label;
    const amount = parseFloat(e.target.amount.value);
    const date = e.target.date.value;
    const comment = e.target.comment.value;

    const transaction = {
      date: date,
      type: "-",
      category: expense,
      comment: comment,
      sum: amount,
    };

    const { error } = ExpenseFormValidation(transaction);
    if (error) {
      if (!expense) {
        Notify.failure("Please select the category");
      }
      if (!amount) {
        Notify.failure("Please enter the amount");
      }
    } else {
      const url = id ? `http://localhost:5000/api/finances/transactions/${owner}/${id}` : `http://localhost:5000/api/finances/${owner}`;
      const method = id ? "PUT" : "POST";

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        });

        if (response.ok) {
          const data = await response.json();
          const ownerBalance = data.data.sum;
          updateBalance(ownerBalance);
          const newTransaction = data.data.transactions;
          updateTransactions(newTransaction);
        } else {
          throw new Error("Failed to update income");
        }
      } catch (error) {
        console.error("An error occurred during the PUT request:", error);
      }
    }
    if (setOpenModal === undefined) {
      setOpenEditModal(false);
    } else {
      setOpenModal(false);
    }
  };


  let previousTransactionSumString, prevCommString, prevCategoryString;

if (typeof (prevSum && prevCategory && prevComment) === "undefined") {
  previousTransactionSumString = prevSum2 ;
  prevCommString = prevComment2;
  prevCategoryString = prevCategory2;
} else {
  previousTransactionSumString = prevSum.toString();
  prevCommString = prevComment.toString();
  prevCategoryString = prevCategory.toString();
}


  return (
    <form onSubmit={handleSubmit} className="expenseForm" method="post" action="">
      <Select
        placeholder={prevCategoryString}
        name="expense"
        value={options.find((obj) => obj.value === selectedValue)}
        onChange={(e) => {
          setSelectedValue(e);
        }}
        className="expenseSelect"
        options={options}
        styles={customStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
      <div className="expenseForm__line">

        <input
          className="expenseForm__amount"
          name="amount"
          type="text"
          min="0"
          placeholder={previousTransactionSumString}
        ></input>

        <div>
          <DatePicker className="expenseForm__date" name="date" dateFormat="dd.MM.yyyy" selected={expenseDate} onChange={(date) => setExpenseDate(date)} />
        </div>
      </div>

      <input
        name="comment"
        className="expenseForm__comment"
        type="text"
        placeholder={prevCommString}
      ></input>
      <button  className="expenseForm__button" type="submit" value="Submit">

        ADD
      </button>
    </form>
  );
};

export default ExpensesForm;
