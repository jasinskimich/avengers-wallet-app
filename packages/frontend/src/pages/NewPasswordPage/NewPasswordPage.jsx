import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Notiflix from "notiflix";
import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
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