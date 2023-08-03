import React from "react";
import css from "./EditModal.module.css";
import { useState } from "react";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";
import Modal from "react-modal";

Modal.setAppElement("#root");


function EditModal({ setOpenEditModal, id, updateBalance, updateTransactions, prevSum, prevType, prevComment, prevCategory }) {
    const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };
  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  return (
    <Modal
      isOpen={true} 
      onRequestClose={handleCloseModal} 
      className={css.editModalBackground} 
      overlayClassName={css.editModalOverlay} 
    >
      <div className={css.editModalBackground}>
        <div className={css.editModalContainer}>
          <div className={css.titleCloseBtn}>
            <button onClick={handleCloseModal}>x</button>
          </div>
          <h2 className={css.editModalHeader}>
            Please edit selected transaction
          </h2>
          <div>
            <SwitchCheckbox
              prevCategory={prevCategory}
              prevComment={prevComment}
              prevType={prevType}
              prevSum={prevSum}
              isOn={checked}
              handleToggle={handleToggle}
              id={id}
              updateBalance={updateBalance}
              updateTransactions={updateTransactions}
              setOpenEditModal={setOpenEditModal}
            />
          </div>
          <div className={css.modalFooter}>
            <button
              onClick={handleCloseModal}
              className={css.modalCancelButton}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditModal;
