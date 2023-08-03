import { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Notiflix from "notiflix";
import "react-datepicker/dist/react-datepicker.css";
import IncomeFormValidation from "../FormValidation/IncomeFormValidation";
import "./IncomeForm.css";

const IncomeForm = ({ prevSum2, prevComment2, updateBalance, updateTransactions, id, setOpenModal, setOpenEditModal, prevSum, prevComment }) => {
  const yourDate = new Date();
  const [expenseDate, setExpenseDate] = useState(yourDate);
  const { owner } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = e.target.amount.value ? parseFloat(e.target.amount.value) : prevSum;
    const date = e.target.date.value;
    const comment = e.target.comment.value;

    const transaction = {
      date: date,
      type: "+",
      category: "Income",
      comment: comment,
      sum: amount,
    };

    const { error } = IncomeFormValidation(transaction);

    if (error) {
      if (!amount) {
        Notiflix.Notify.failure("Please enter the amount");
      }
    } else {
      const url = id ? `https://avengers-wallet-app.onrender.com/api/finances/transactions/${owner}/${id}` : `https://avengers-wallet-app.onrender.com/api/finances/${owner}`;

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
          // console.log(data);
          const ownerBalance = data.data.sum;
          updateBalance(ownerBalance);
          const newTransaction = data.data.transactions;

          updateTransactions(newTransaction);
          Notiflix.Notify.success("Transaction saved");
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

  let previousTransactionSumString, prevCommString;

  if (typeof prevSum === "undefined") {
    previousTransactionSumString = prevSum2;
    prevCommString = prevComment2;
  } else {
    previousTransactionSumString = prevSum.toString();
    prevCommString = prevComment.toString();
  }

  return (
    <form onSubmit={handleSubmit} className="incomeForm" method="post" action="">
      <div className="incomeForm__line">
        <input className="incomeForm__amount" name="amount" type="text" min="0" placeholder={previousTransactionSumString}></input>
        <DatePicker className="incomeForm__date" name="date" dateFormat="dd.MM.yyyy" selected={expenseDate} onChange={(date) => setExpenseDate(date)} />
      </div>
      <input name="comment" className="incomeForm__comment" type="text" placeholder={prevCommString}></input>
      <button className="incomeForm__button" type="submit" value="Submit">
        ADD
      </button>
    </form>
  );
};

export default IncomeForm;
