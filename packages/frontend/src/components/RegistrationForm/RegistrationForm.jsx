import React, { useState } from "react";
import { Link } from "react-router-dom";
import Notiflix from 'notiflix';
import css from "./RegistrationForm.module.css"
import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import LockIcon from '@mui/icons-material/Lock';
import walletIcon from "../../images/Wallet.svg";
import PasswordStrength from "./PasswordStrength";
import Loader from "../LoaderSpinner/Loader";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);

    if (!email || !name || !password || !confirmPassword) {
      Notiflix.Notify.warning('Email, password or name is empty, please complete the missing content.')
      return;
    }

    if (password !== confirmPassword) {
      Notiflix.Notify.warning('Passwords do not match, please try again.');
      setIsLoading(true);
      return;
    }

    try{
      let response = await fetch(`https://avengers-wallet-app.onrender.com/api/users/checkEmail/${email}`);
      response = await response.json();

      if(response.exists) {
        Notiflix.Notify.warning('Email already exists in the database. Please use a different email.');
        setIsLoading(true);
        return;
      }
      
      let result = await fetch('https://avengers-wallet-app.onrender.com/api/users/signup', {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      result = await result.json();
     
      if (result) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        Notiflix.Notify.info('An email verifying your registration has been sent to the email address provided in the form.')
      }
    } catch (error){
      console.error(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ "& > :not(style)": { m: 2 } }} className={css.registerBox}>
        <div className={css.registrationFormHeader}>
          <img src={walletIcon} alt="wallet-icon" className={css.walletIcon} />
          <h1>Wallet</h1>
        </div>
        <FormControl variant="standard" className={css.inputWidth}>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="E-mail"
            required
            startAdornment={
              <InputAdornment position="start">
                <LocalPostOfficeIcon
                  sx={{ color: "lightgrey", mr: 1, my: 0.5 }}
                  className={css.iconMarginPost}
                />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" className={css.inputWidth}>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
            minLength={6}
            maxLength={12}
            autoComplete="newPassword"
            required
            startAdornment={
              <InputAdornment position="start">
                <LockIcon
                  sx={{ color: "lightgrey", mr: 1, my: 0.5 }}
                  className={css.iconMargin}
                />
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
            autoComplete="newPassword"
            required
            startAdornment={
              <InputAdornment position="start">
                <LockIcon
                  sx={{ color: "lightgrey", mr: 1, my: 0.5 }}
                  className={css.iconMargin}
                />
                <PasswordStrength password={password} />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="standard" className={css.inputWidthLast}>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleInputChange(e)}
            placeholder="First Name"
            minLength={1}
            maxLength={12}
            required
            startAdornment={
              <InputAdornment position="start">
                <AccountBoxIcon
                  sx={{ color: "lightgrey", mr: 1, my: 0.5 }}
                  className={css.iconMargin}
                />
              </InputAdornment>
            }
          />
        </FormControl>

  
        {isLoading ? (
          <>
             <button
          variant="contained"
          type="submit"
          className={css.registrationButton}
        >
          REGISTER
        </button>

        <Link to="/login">
          <button className={css.loginButton}>LOG IN</button>
        </Link>
          </>
        ) : (
          <Loader />
        )}
        <div>
          <Link to="/verify">
            <span className={css.verifyLink}>
              If you didn't get an verification email click this link.
            </span>
          </Link>
        </div>
      </Box>
    </form>
  );
};

export default RegistrationForm;