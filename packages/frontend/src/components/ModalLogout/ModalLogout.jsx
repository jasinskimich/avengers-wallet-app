import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import css from "./ModalLogout.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Notiflix from "notiflix";

Modal.setAppElement("#root");

export const ModalLogout = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Brak zdefiniowanego tokenu uwierzytelniania.");
      return;
    }

    axios
      .post(`https://avengers-wallet-app.onrender.com/api/users/logout`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setModalIsOpen(false);
        Notiflix.Notify.success("Logout successful");

        setTimeout(() => {
          window.location.replace("/login");
          localStorage.setItem("authToken", null);
        }, 1000);
      });
  };

  return (
    <div>
      <div className={css.exitSection}>
        <LogoutIcon sx={{ mr: 0, my: 4 }} className={css.icon} onClick={() => setModalIsOpen(true)} />
        <button className={css.buttonExit} onClick={() => setModalIsOpen(true)}>
          Exit
        </button>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Modal wylogowywania" className={css.container}>
        <h2 className={css.modalTitle}>Are you sure, you want to log out?</h2>
        <button onClick={handleLogout} className={css.modalButton}>
          Yes, log out
        </button>
        <button onClick={() => setModalIsOpen(false)} className={css.modalButton}>
          No
        </button>
      </Modal>
    </div>
  );
};
