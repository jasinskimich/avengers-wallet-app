import React, { useState } from "react";
import Notiflix from "notiflix";
import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import walletIcon from "../../images/Wallet.svg"
import { Link } from "react-router-dom";
import css from "./VerifyForm.module.css"

const VerifyForm = () => {
    const [email, setEmail] = useState("");
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      if (id === "email") {
        setEmail(value);
      }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            Notiflix.Notify.warning('Please enter an email.')
        }

        try{
            let response = await fetch(`http://localhost:5000/api/users/checkEmail/${email}`);
            response = await response.json();
      
            if(response.exists===false) {
              Notiflix.Notify.warning('Email is not exists in the database. Please write a different email.');
              return;
            }

            let responseCheckVerify = await fetch (`http://localhost:5000/api/users/checkVerify/${email}`);
            responseCheckVerify = await responseCheckVerify.json();

            if(response.exists && responseCheckVerify.verification) {
              Notiflix.Notify.warning('Email is exists in the database and verified.');
              return;
            }

            let result = await fetch('http://localhost:5000/api/users/verify', {
                method: "post",
                body: JSON.stringify({ email }),
                headers: {
                'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            console.warn(result);
            if (result && email) {
                setEmail("");
        
                Notiflix.Notify.info('An email verifying your registration has been sent to the email address provided in the form.')
            }
        } catch (error){
            console.error(error)
        }
    };
  
    return (
      <form onSubmit={handleSubmit} className={css.verifyForm}>
        <Box sx={{ '& > :not(style)': { m: 2 } }} className={css.verifyBox}>
          <div className={css.verifyFormHeader}>
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
              className={css.inputMargin}
              startAdornment={
                <InputAdornment position="start">

                  <LocalPostOfficeIcon sx={{ color: 'lightgrey', mr: 1, my: 0.5 }} className={css.iconMarginPost} />

                </InputAdornment>
              }
            />
          </FormControl>

          <button variant="contained" type="submit" className={css.verifyButton}>
            Send verification link again
          </button>

          <div className={css.verifyLinkSection}>
            <div>
              <Link to="/login" className={css.verifyLink}>
                Login page
              </Link>
            </div>

            <div className={css.verifyLinkMargin}>
              <Link to="/register" className={css.verifyLink}>
                Back to register page
              </Link>
            </div>
          </div>
        </Box>
      </form>
    );
};
  
export default VerifyForm;