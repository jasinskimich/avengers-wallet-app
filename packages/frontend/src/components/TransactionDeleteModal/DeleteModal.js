import React from "react";
import css from "./DeleteModal.module.css";
import { useParams } from "react-router-dom";

function DeleteModal({ setOpenDeleteModal, id, updateDeleteTransactions }) {
  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const { owner } = useParams();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(
        `http://localhost:5000/api/finances/transactions/${owner}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        response = await response.json();
        updateDeleteTransactions(response.deletedTransaction, response.balance);

        handleCloseModal();
      } else {
        throw new Error("Failed to update currency");
      }
    } catch (error) {
      console.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={css.deleteModalBackground}>
      <div className={css.deleteModalContainer}>
        <div className={css.titleCloseBtn}>
          <button onClick={handleCloseModal}>x</button>
        </div>
        <h2 className={css.deleteModalHeader}>
          Are you sure you want to delete this item?
        </h2>

        <div className={css.modalFooter}>
          <button onClick={handleDelete} className={css.modalDeleteButton}>
            DELETE
          </button>
          <button onClick={handleCloseModal} className={css.modalCancelButton}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
