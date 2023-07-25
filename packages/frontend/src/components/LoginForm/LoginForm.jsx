import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Notiflix from 'notiflix';
import { useState } from "react";
import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import walletIcon from "../../images/Wallet.svg"
import styles from "./LoginForm.module.css";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      let response = await fetch(`http://localhost:5000/api/users/checkEmail/${email}`);
      let data = await response.json();

      if(!data.exists) {
        Notiflix.Notify.warning('Email or password is incorrect.');
        return;
      }
        
      let result = await fetch('http://localhost:5000/api/users/login', {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let loginResponse = await result.json();
      console.warn(loginResponse);

      if (loginResponse) {
        console.log("User logged in:", loginResponse);
        let id = loginResponse.data.user._id;
        navigate(`/home/${id}`);
  
        setEmail("");
        setPassword("");
      } else {
        console.error(loginResponse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ '& > :not(style)': { m: 2 } }} className={styles.loginBox}>
        <div className={styles.loginFormHeader}>
          <img src={walletIcon} alt="wallet-icon" className={styles.walletIcon} />
          <h1>Wallet</h1>
        </div>
        <FormControl variant="standard" className={styles.inputWidthFirst}>
          <Input 
            type="email" 
            id="email"
            name="email"
            value={email} 
            onChange={(e) => handleInputChange(e)} 
            placeholder="E-mail"
            required 
            className={styles.inputMarginFirst}
            startAdornment={
              <InputAdornment position="start">
                <LocalPostOfficeIcon sx={{ color: 'lightgrey', mr: 1, my: 0.5 }} className={styles.iconMarginPost} />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" className={styles.inputWidth}>
          <Input 
            type="password" 
            id="password" 
            name="password"
            value={password} 
            onChange={(e) => handleInputChange(e)} 
            placeholder="Password"
            minLength={6}
            maxLength={12}
            required
            className={styles.inputMargin}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon sx={{ color: 'lightgrey', mr: 1, my: 0.5 }} className={styles.iconMargin} />
              </InputAdornment>
            }
          />
        </FormControl>

        <button variant="contained" type="submit" className={styles.loginButton}>
          LOG IN
        </button>

        <Link to="/register">
          <button className={styles.registrationButton}>REGISTER</button>
        </Link>
      </Box>
    </form>
  );
};

export default LoginForm;
