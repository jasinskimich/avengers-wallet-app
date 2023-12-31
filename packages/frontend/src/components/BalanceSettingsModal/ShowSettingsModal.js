import React, { useState } from "react";
import BalanceSettingsModal from "./BalanceSettingsModal";
import css from "./BalanceSettingsModal.module.css";
import { ReactComponent as Settings } from "../../images/settings_black_24dp.svg";

function ShowSettingsModal({ updateCurrency }) {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <>
      <div className={css.buttonContainter}>
        <button
          className={css.currencySettingsBtn}
          onClick={() => {
            setSettingsModalOpen(true);
          }}
        >
          <Settings className={css.icon} />
        </button>
      </div>
      {settingsModalOpen && (
        <BalanceSettingsModal
          setSettingsOpenModal={setSettingsModalOpen}
          updateCurrency={updateCurrency}
        />
      )}
    </>
  );
}

export default ShowSettingsModal;
