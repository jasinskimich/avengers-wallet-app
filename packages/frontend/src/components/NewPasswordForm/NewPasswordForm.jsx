import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Notiflix from "notiflix";
import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import css from "./NewPasswordForm.module.css";
import walletIcon from "../../images/Wallet.svg";
import PasswordStrength from "./PasswordStrength";

const NewPasswordForm = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      Notiflix.Notify.warning("Email, password or name is empty, please complete the missing content.");
      return;
    }

    if (password !== confirmPassword) {
      Notiflix.Notify.warning("Passwords do not match, please try again.");
      return;
    }

    try {
      let result = await fetch(`https://avengers-wallet-app.onrender.com/api/users/reset-password/${resetToken}`, {
        method: "post",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result && result.status === "success") {
        setPassword("");
        setConfirmPassword("");
        Notiflix.Notify.success("Password has been reset.");
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      } else {
        Notiflix.Notify.failure("An error occurred while resetting your password.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.newPasswordForm}>
      <Box sx={{ "& > :not(style)": { m: 2 } }} className={css.newPasswordBox}>
        <div className={css.newPasswordHeader}>
          <img src={walletIcon} alt="wallet-icon" className={css.walletIcon} />
          <h1>Wallet</h1>
        </div>

        <FormControl variant="standard" className={css.inputWidth}>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handleInputChange}
            placeholder="New password"
            minLength={6}
            maxLength={12}
            required
            className={css.inputMargin}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon sx={{ color: "lightgrey", mr: 1, my: 0.5 }} className={css.iconMargin} />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="standard" className={css.inputWidth}>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm password"
            minLength={6}
            maxLength={12}
            required
            startAdornment={
              <InputAdornment position="start">
                <LockIcon sx={{ color: "lightgrey", mr: 1, my: 0.5 }} className={css.iconMargin} />
                <PasswordStrength password={password} />
              </InputAdornment>
            }
          />
        </FormControl>
        <button variant="contained" type="submit" className={css.newPasswordButton}>
          Reset Password
        </button>

        <Link to="/login" className={css.newPasswordLink}>
          Login page
        </Link>
      </Box>
    </form>
  );
};

export default NewPasswordForm;
