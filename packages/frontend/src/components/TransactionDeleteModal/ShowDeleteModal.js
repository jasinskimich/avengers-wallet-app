import React, { useState } from "react";
import css from "./DeleteModal.module.css";
import DeleteModal from "./DeleteModal";

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
