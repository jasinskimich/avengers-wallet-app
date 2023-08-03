import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Header } from "../Header/Header";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";
import css from "./ModalAddTransaction.module.css";

function ModalAddTransaction({
  prevCategory2,
  prevSum2,
  prevComment2,
  setOpenModal,
  updateBalance,
  updateTransactions,
  id,
  prevType2,
}) {
  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleCloseModal}
      className={css.backgroundModalComponent}
      overlayClassName={css.editModalOverlay}
    >
      <div className={css.headerConatiner}>
        <Header />
      </div>
      <div className={css.modalBackground}>
        <div className={css.modalContainer}>
          <div className={css.titleCloseBtn}>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              x
            </button>
          </div>
          <div>
            <h2 className={css.modalHeader}>Add transaction</h2>
            <SwitchCheckbox
              prevCategory2={prevCategory2}
              prevSum2={prevSum2}
              prevComment2={prevComment2}
              prevType={prevType2}
              isOn={checked}
              setOpenModal={setOpenModal}
              handleToggle={handleToggle}
              updateBalance={updateBalance}
              updateTransactions={updateTransactions}
              id={id}
            />
            <div className={css.modalFooter}>
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
    </Modal>
  );
}
export default ModalAddTransaction;
