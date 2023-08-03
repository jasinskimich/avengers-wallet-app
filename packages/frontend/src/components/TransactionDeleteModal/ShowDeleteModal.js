import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import css from "./DeleteModal.module.css";

function ShowDeleteModal({id, updateDeleteTransactions}) {
  const [modalDeleteOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <button
        className={css.deleteButton}
        onClick={() => {
            setDeleteModalOpen(true);
        }}
      >
        Delete
      </button>
      {modalDeleteOpen && <DeleteModal updateDeleteTransactions={updateDeleteTransactions} setOpenDeleteModal={setDeleteModalOpen} id={id}/>}
    </>
  );
}

export default ShowDeleteModal;
