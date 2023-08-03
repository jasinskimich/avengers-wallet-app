import React, { useEffect } from "react";
import CurrencyForm from "../CurrencyForm/CurrencyForm";
import css from "./BalanceSettingsModal.module.css";

function BalanceSettingsModal({ setSettingsOpenModal, updateCurrency }) {
  const handleCloseModal = () => {
    setSettingsOpenModal(false);
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
    <div className={css.modalBox}>
      <div className={css.modalBackground}>
        <div className={css.modalContainer}>
          <div className={css.titleCloseBtn}>
            <button onClick={handleCloseModal}></button>
          </div>
          <h2 className={css.modalHeader}>Change your currency</h2>

          <CurrencyForm updateCurrency={updateCurrency} handleCloseModal={handleCloseModal} />
          <div>
            <div className={css.modalFooter}>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceSettingsModal;
