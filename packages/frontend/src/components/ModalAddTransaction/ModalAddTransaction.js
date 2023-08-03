import React, { useState } from "react";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";
import "./ModalAddTransaction.css";

function ModalAddTransaction({ prevCategory2, prevSum2, prevComment2, setOpenModal, updateBalance, updateTransactions, id, prevType2 }) {
  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="modalBox">
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            ></button>
          </div>
          <div>
            <h2 className="modalHeader">Add transaction</h2>
            <SwitchCheckbox prevCategory2={prevCategory2} prevSum2={prevSum2} prevComment2={prevComment2} prevType={prevType2} isOn={checked} setOpenModal={setOpenModal} handleToggle={handleToggle} updateBalance={updateBalance} updateTransactions={updateTransactions} id={id} />
            <div className="modalFooter">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalAddTransaction;
