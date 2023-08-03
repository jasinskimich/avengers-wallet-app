import React, { useState, useEffect } from "react";
import ModalAddTransaction from "./ModalAddTransaction";
import css from "./ModalAddTransaction.module.css";

function ShowModal({ updateBalance, updateTransactions, id, prevType2, prevComment2, prevSum2, prevCategory2 }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Event listener to close the modal with ESC key
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
  },);
  

  return (
    <>
      <button
        className={css.openModalBtn}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        +
      </button>

      {modalOpen && <ModalAddTransaction prevCategory2={prevCategory2} prevSum2={prevSum2} prevComment2={prevComment2} prevType2={prevType2} id={id} setOpenModal={setModalOpen} updateBalance={updateBalance} updateTransactions={updateTransactions}/>}
    </>
  );
}

export default ShowModal;
