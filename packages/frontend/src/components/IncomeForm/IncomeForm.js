import "./IncomeForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import IncomeFormValidation from "../FormValidation/IncomeFormValidation";
import { Notify } from "notiflix";

const IncomeForm = () => {
  const yourDate = new Date();
  const [expenseDate, setExpenseDate] = useState(yourDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const date = e.target.date.value;
    const comment = e.target.comment.value;

    const data = { type: "income", amount: amount, date: date, comment: comment };

    const { error } = IncomeFormValidation(data);
    if (error) {
      if (!amount) {
        Notify.failure("Please enter the amount");
      }
    } else {
      const newIncome = { data };
      console.log(newIncome);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="income-form" method="post" action="">
      <div>
        <input className="income-form__amount" name="amount" type="number" min="0" placeholder="0.00"></input>
        <DatePicker name="date" dateFormat="dd.MM.yyyy" selected={expenseDate} onChange={(date) => setExpenseDate(date)} />
      </div>
      <input name="comment" className="income-form__comment" type="text" placeholder="Comment"></input>
      <button className="income-form__button" type="submit" value="Submit">
        ADD
      </button>
    </form>
  );
};

export default IncomeForm;
