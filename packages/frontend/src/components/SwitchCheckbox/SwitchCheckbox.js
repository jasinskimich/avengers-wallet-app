import React from "react";
import IncomeForm from "../IncomeForm/IncomeForm";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import "./SwitchCheckbox.css";

const SwitchCheckbox = ({ isOn, handleToggle, onColor, updateBalance }) => {
  return (
    <>
      <div className="switchBox">
        <label style={{ color: !isOn && "#24cca7", fontWeight: !isOn && "700" }}>Income</label>
        <input checked={isOn} onChange={handleToggle} className="switchBox__checkbox" id={`react-switch-new`} type="checkbox" />
        <label style={{ background: isOn && onColor }} className="switchBox__label" htmlFor={`react-switch-new`}>
          <span className={`switchBox__button`} />
        </label>
        <label style={{ color: isOn && "#ff6596", fontWeight: isOn && "700" }}>Expense</label>
      </div>
      <div className="modalFormArea">
        {isOn && <ExpenseForm updateBalance={updateBalance} />}
        {!isOn && <IncomeForm updateBalance={updateBalance} />}
      </div>
    </>
  );
};

export default SwitchCheckbox;
