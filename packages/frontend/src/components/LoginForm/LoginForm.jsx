import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.css";
import walletIcon from "../../images/Wallet.svg"
import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import LockIcon from '@mui/icons-material/Lock';


const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const { email, password } = values;

    if (!email || !password) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User logged in:", data);
        let id = data.data.user._id;
        navigate(`/home/:${id}`);
      } else {
        const error = await response.json();
        setFieldError("password", error.message);
      }
    } catch (error) {
      console.error("An error occurred. Please try again later.");
    }

    setSubmitting(false);
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 2 } }} className={styles.loginBox}>
      <div className={styles.loginFormHeader}>
          <img src={walletIcon} alt="wallet-icon" className={styles.walletIcon} />
          <h1>Wallet</h1>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address").required("Email is required"),
          password: Yup.string().min(6, "Password must be at least 6 characters").max(12, "Password must not exceed 12 characters").required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl variant="standard" className={styles.inputWidthFirst}>
              <Input
                type="email"
                name="email" 
                placeholder="Email" 
                autoComplete="username"
                className={styles.loginInput}
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
                name="password" 
                placeholder="Password" 
                autoComplete="current-password" 
                className={styles.inputMargin}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'lightgrey', mr: 1, my: 0.5 }} className={styles.iconMargin} />
                  </InputAdornment>
                }
              />
            </FormControl>
            
            <div>

              <button
                className={styles.loginButton}
                type="submit"
                disabled={isSubmitting}
              >
                LOG IN

              </button>
            </div>
            <div>
              <Link to="/register">

                <button className={styles.registrationButton}>
                  REGISTER
                </button>

              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
