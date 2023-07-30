import React from "react";
import "./ModalAddTransaction.css";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";
import { useState } from "react";

function ModalAddTransaction({ setOpenModal, updateBalance, updateTransactions, id }) {
  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            x
          </button>
        </div>
        <div>
          <h2 className="modalHeader">Add transaction</h2>
          <SwitchCheckbox isOn={checked} setOpenModal={setOpenModal} handleToggle={handleToggle} updateBalance={updateBalance} updateTransactions={updateTransactions} id={id}/>
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
  );
}
export default ModalAddTransaction;
