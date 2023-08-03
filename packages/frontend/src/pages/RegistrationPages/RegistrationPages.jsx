import React from "react";
import { Box } from "@mui/material";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import RegistrationPageIcon from "../../images/RegistrationPageIcon.svg";
import css from "./RegistrationPages.module.css";

const RegistrationPages = () => {
  return (
    <Box>
      <div className={css.main}>
        <div className={css.titleContainer}>
          <img className={css.registartionIcon} src={RegistrationPageIcon} alt="Frame" />
          <div>
            <h1 className={css.logoTitle}>Finance App</h1>
          </div>
        </div>
        <div className={css.registrationFormContainer}>
          <RegistrationForm />
        </div>
      </div>
    </Box>
  );
};

export default RegistrationPages;
