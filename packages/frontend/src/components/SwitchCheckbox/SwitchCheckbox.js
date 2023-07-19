import React from "react";
import IncomeForm from "../IncomeForm/IncomeForm";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import "./SwitchCheckbox.css";

const SwitchCheckbox = ({ isOn, handleToggle, onColor }) => {
  return (
    <>
      <div className="switch-box">
        <label style={{ color: !isOn && "#24cca7", fontWeight: !isOn && "700" }}>Income</label>
        <input checked={isOn} onChange={handleToggle} className="switch-box__checkbox" id={`react-switch-new`} type="checkbox" />
        <label style={{ background: isOn && onColor }} className="switch-box__label" htmlFor={`react-switch-new`}>
          <span className={`switch-box__button`} />
        </label>
        <label style={{ color: isOn && "#ff6596", fontWeight: isOn && "700" }}>Expense</label>
      </div>
      {isOn && <ExpenseForm />}
      {!isOn && <IncomeForm />}
    </>
  );
};

export default SwitchCheckbox;
