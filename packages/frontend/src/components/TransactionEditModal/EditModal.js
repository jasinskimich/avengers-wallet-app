import React from "react";
import css from "./EditModal.module.css";
import { useState } from "react";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";

function EditModal({ setOpenEditModal, id, updateBalance, updateTransactions }) {
    const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  };
  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div className={css.editModalBackground}>
      <div className={css.editModalContainer}>
        <div className={css.titleCloseBtn}>
          <button onClick={handleCloseModal}>x</button>
        </div>
        <h2 className={css.editModalHeader}>
          Please edit selected transaction
        </h2>
        <div>
          <SwitchCheckbox isOn={checked} handleToggle={handleToggle} id={id} updateBalance={updateBalance} updateTransactions={updateTransactions}/>
        </div>
        <div className={css.modalFooter}>
          
          <button onClick={handleCloseModal} className={css.modalCancelButton}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
