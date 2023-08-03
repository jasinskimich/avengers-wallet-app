import React, { useEffect } from "react";
import css from "./BalanceSettingsModal.module.css";
import CurrencyForm from "../CurrencyForm/CurrencyForm";
import Modal from "react-modal";
import { Header } from "../Header/Header";
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
          <h2 className={css.modalHeader}>Change your currency</h2>

          <CurrencyForm
            updateCurrency={updateCurrency}
            handleCloseModal={handleCloseModal}
          />
          <div>
            <div className={css.modalFooter}>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BalanceSettingsModal;
