import "./IncomeForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const IncomeForm = () => {
  const yourDate = new Date();
  const [expenseDate, setExpenseDate] = useState(yourDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const date = e.target.date.value;
    const comment = e.target.comment.value;
    console.log(amount, date, comment);
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
