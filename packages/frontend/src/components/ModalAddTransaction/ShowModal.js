import React, { useState } from "react";
import ModalAddTransaction from "./ModalAddTransaction";

function ShowModal({ updateBalance, updateTransactions, id, prevType2, prevComment2, prevSum2, prevCategory2 }) {
  const [modalOpen, setModalOpen] = useState(false);
  

  return (
    <>
      <button
        className="openModalBtn"
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
