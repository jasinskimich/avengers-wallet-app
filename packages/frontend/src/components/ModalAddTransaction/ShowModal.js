import React, { useState } from "react";
import ModalAddTransaction from "./ModalAddTransaction";

function ShowModal({ updateBalance, updateTransactions }) {
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

      {modalOpen && <ModalAddTransaction setOpenModal={setModalOpen} updateBalance={updateBalance} updateTransactions={updateTransactions}/>}
    </>
  );
}

export default ShowModal;
