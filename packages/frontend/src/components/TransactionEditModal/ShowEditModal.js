import React, { useState } from "react";
import css from "./EditModal.module.css";
import EditModal from "./EditModal";
import { ReactComponent as EditPen } from "../../images/editPen.svg";


function ShowEditModal({id, updateBalance, updateTransactions, prevSum, prevType, prevComment,prevCategory}) {
  const [modalEditOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <button
        className={css.editButton}
        onClick={() => {
            setEditModalOpen(true);
        }}
      >
        <EditPen className={css.editIcon} />
      </button>
      {modalEditOpen && <EditModal prevCategory={prevCategory} prevComment={prevComment} prevType={prevType} prevSum={prevSum} id={id} setOpenEditModal={setEditModalOpen} updateBalance={updateBalance} updateTransactions={updateTransactions}/>}
    </>
  );
}

export default ShowEditModal;
