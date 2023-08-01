import React from "react";
import IncomeForm from "../IncomeForm/IncomeForm";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import "./SwitchCheckbox.css";




const SwitchCheckbox = ({prevCategory2, prevSum2, prevComment2, prevSum, prevCategory, prevComment, prevType, isOn, handleToggle, onColor, updateBalance, updateTransactions, id, setOpenModal, setOpenEditModal }) => {
  

  const prevTypeString = prevType.toString();
    
if (prevTypeString === "+") {
  return (
    <>
      <div className="switchBox">


         <label style={{ color: prevTypeString === "-" ? "" : (isOn ? "" : "#24cca7"), fontWeight: prevTypeString === "-" ? "" : (isOn ? "" : "700") }}>Income</label>
         <input
          checked={prevTypeString === "+" ? isOn : !isOn}
          onChange={handleToggle}
          className="switchBox__checkbox"
          id={`react-switch-new`}
          type="checkbox"/>
          <label style={{ background: isOn && onColor }} className="switchBox__label" htmlFor={`react-switch-new`}>
           <span className={`switchBox__button`}>
            {isOn && "−"}
            {!isOn && "+"}
          </span>
          </label>
          <label style={{ color: prevTypeString === "-" ? "#ff6596" : (isOn ? "#ff6596" : ""), fontWeight: prevTypeString === "-" ? "700" : (isOn ? "700" : "") }}>Expense</label>

      </div>

      <div className="modalFormArea">

           {!isOn  && <IncomeForm prevSum2={prevSum2} prevComment2={prevComment2} prevComment={prevComment} prevSum={prevSum} setOpenEditModal={setOpenEditModal} setOpenModal={setOpenModal} updateBalance={updateBalance} updateTransactions={updateTransactions} id={id} />}
           {(prevTypeString === "-" || isOn)  && <ExpenseForm prevSum2={prevSum2} prevComment2={prevComment2} prevCategory2={prevCategory2} prevCategory = {prevCategory} prevComment={prevComment} prevSum={prevSum} setOpenEditModal={setOpenEditModal} setOpenModal={setOpenModal} updateBalance={updateBalance} updateTransactions={updateTransactions} id={id} />}

      </div>
    </>
  );
} else {
  return (
    <>
      <div className="switchBox">
         <label style={{ color: prevTypeString === "+" ? "" : (isOn ? "#24cca7" : ""), fontWeight: prevTypeString === "+" ? "" : (isOn ? "700" : "") }}>Income</label>
         <input
          checked={prevTypeString === "+" ? isOn : !isOn}
          onChange={handleToggle}
          className="switchBox__checkbox"
          id={`react-switch-new`}
          type="checkbox"/>
          <label style={{ background: isOn && onColor }} className="switchBox__label" htmlFor={`react-switch-new`}>
          <span className={`switchBox__button`}>
            {isOn && "−"}
            {!isOn && "+"}
          </span>
          </label>
          <label style={{ color: prevTypeString === "+" ? "" : (isOn ? "" : "#ff6596"), fontWeight: prevTypeString === "" ? "" : (isOn ? "" : "700") }}>Expense</label>
      </div>

      <div className="modalFormArea">
           {isOn  && <IncomeForm prevSum2={prevSum2} prevComment2={prevComment2} prevComment={prevComment} prevSum={prevSum} setOpenEditModal={setOpenEditModal} setOpenModal={setOpenModal} updateBalance={updateBalance} updateTransactions={updateTransactions} id={id} />}
           {(prevTypeString === "+" || !isOn)  && <ExpenseForm prevSum2={prevSum2} prevComment2={prevComment2} prevCategory2={prevCategory2} prevCategory = {prevCategory} prevComment={prevComment} prevSum={prevSum} setOpenEditModal={setOpenEditModal} setOpenModal={setOpenModal} updateBalance={updateBalance} updateTransactions={updateTransactions} id={id} />}
      </div>
    </>
  );
}
   
};


export default SwitchCheckbox;
