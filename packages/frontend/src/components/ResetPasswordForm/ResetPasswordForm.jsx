import React, { useState } from "react";
import Notiflix from "notiflix";
import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import walletIcon from "../../images/Wallet.svg"
import { Link } from "react-router-dom";
import css from "./ResetPasswordForm.module.css"

const ResetPasswordForm = () => {
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

        try {
            let response = await fetch(`https://avengers-wallet-app.onrender.com/api/users/checkEmail/${email}`);
            response = await response.json();

            if (response.exists === false) {
                Notiflix.Notify.warning('Email is not exists in the database. Please write a different email.');
                return;
            }

            let result = await fetch('https://avengers-wallet-app.onrender.com/api/users/forgot-password', {
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

                Notiflix.Notify.info('A link to reset password to your account has been sent to the email address provided in the form.')
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className={css.resetPasswordForm}>
            <Box sx={{ '& > :not(style)': { m: 2 } }} className={css.resetPasswordBox}>
                <div className={css.resetPasswordHeader}>
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

                <button variant="contained" type="submit" className={css.resetPasswordButton}>
                    Send email to reset your password
                </button>

                <div className={css.resetPasswordLinkSection}>
                    <div>
                        <Link to="/login" className={css.resetPasswordLink}>
                            Login page
                        </Link>
                    </div>

                    <div className={css.resetPasswordLinkMargin}>
                        <Link to="/register" className={css.resetPasswordLink}>
                            Back to register page
                        </Link>
                    </div>
                </div>
            </Box>
        </form>
    );
};

export default ResetPasswordForm;