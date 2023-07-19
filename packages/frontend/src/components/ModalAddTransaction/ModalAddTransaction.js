import React from "react";
import Modal from "react-modal";
import "./ModalAddTransaction.css";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    borderRadius: "20px",
    padding: "50px",
  },
};

Modal.setAppElement(document.getElementById("root"));

const ModalAddTransaction = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
    console.log(checked);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="modal">
      <button className="modal__open-button" onClick={openModal}>
        +
      </button>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <button className="modal__close-button" onClick={closeModal}>
          X
        </button>
        <h2 className="modal__header">Add transaction</h2>
        <SwitchCheckbox isOn={checked} handleToggle={handleToggle} />
        <button className="modal__cancel-button" onClick={closeModal}>
          CANCEL
        </button>
      </Modal>
    </div>
  );
};

export default ModalAddTransaction;
