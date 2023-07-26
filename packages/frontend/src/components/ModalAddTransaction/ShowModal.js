import React, { useState } from "react";
import ModalAddTransaction from "./ModalAddTransaction";

function ShowModal({ updateBalance }) {
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

      {modalOpen && <ModalAddTransaction setOpenModal={setModalOpen} updateBalance={updateBalance}/>}
    </>
  );
}

export default ShowModal;
