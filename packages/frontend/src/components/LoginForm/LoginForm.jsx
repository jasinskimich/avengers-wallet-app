import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.css";
import { ReactComponent as Wallet } from "../../images/Wallet.svg";


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

        navigate("/home");
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
    <div className={styles.loginBox}>
      <h1>
        <Wallet className={styles.loginBoxTitle} />
        WALLET
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(12, "Password must not exceed 12 characters")
            .required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.inputBox}>
              <Field
                className={`${styles.loginInput} ${styles.loginInputEmail} `}
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="username"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.inputBox}>
              <Field
                className={` ${styles.loginInput} ${styles.loginInputPassword}`}
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>
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
    </div>
  );
};

export default LoginForm;
