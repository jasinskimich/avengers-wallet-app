import React from "react";
import { Box } from "@mui/material";
import css from "./NewPasswordPage.module.css"
import NewPasswordForm from "../../components/NewPasswordForm/NewPasswordForm";

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