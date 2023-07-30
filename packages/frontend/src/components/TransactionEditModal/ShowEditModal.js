import React, { useState } from "react";
import css from "./EditModal.module.css";
import EditModal from "./EditModal";
import { ReactComponent as EditPen } from "../../images/editPen.svg";


function ShowEditModal({id, updateBalance, updateTransactions}) {
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
      {modalEditOpen && <EditModal id={id} setOpenEditModal={setEditModalOpen} updateBalance={updateBalance} updateTransactions={updateTransactions}/>}
    </>
  );
}

export default ShowEditModal;
