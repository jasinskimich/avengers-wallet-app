import "./IncomeForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import IncomeFormValidation from "../FormValidation/IncomeFormValidation";
import { Notify } from "notiflix";
import { useParams } from "react-router-dom";

const IncomeForm = ({ updateBalance, updateTransactions, id }) => {
  const yourDate = new Date();
  const [expenseDate, setExpenseDate] = useState(yourDate);
  const { owner } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const date = e.target.date.value;
    const comment = e.target.comment.value;

    const transaction = {
      date: date,
      type: "+",
      category: "Income",
      comment: comment,
      sum: parseInt(amount),
    };

    const { error } = IncomeFormValidation(transaction);

    if (error) {
      if (!amount) {
        Notify.failure("Please enter the amount");
      }
    } else {
      const url = id
        ? `http://localhost:5000/api/finances/transactions/${owner}/${id}`
        : `http://localhost:5000/api/finances/${owner}`;
        
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

  };
  return (
    <form
      onSubmit={handleSubmit}
      className="incomeForm"
      method="post"
      action=""
    >
      <div className="incomeForm__line">
        <input
          className="incomeForm__amount"
          name="amount"
          type="number"
          min="0"
          placeholder="0.00"
        ></input>
        <DatePicker
          className="incomeForm__date"
          name="date"
          dateFormat="dd.MM.yyyy"
          selected={expenseDate}
          onChange={(date) => setExpenseDate(date)}
        />
      </div>
      <input
        name="comment"
        className="incomeForm__comment"
        type="text"
        placeholder="Comment"
      ></input>
      <button className="incomeForm__button" type="submit" value="Submit">
        ADD
      </button>
    </form>
  );
};

export default IncomeForm;
