import React from "react";
import { Box } from "@mui/material";
import NewPasswordForm from "../../components/NewPasswordForm/NewPasswordForm";
import css from "./NewPasswordPage.module.css"

const NewPasswordPage = () => {
  return (
    <Box className={css.margins}>
      <h1 className={css.newPasswordHeader}>Reset your password</h1>
      <div className={css.main}>
        <NewPasswordForm />
      </div>  
    </Box>
    );
  };
  
  export default NewPasswordPage;