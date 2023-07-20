import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm/"

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
    <div>
      <h1>WALLET</h1>
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
            <div>
              <label>Email</label>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label>Password</label>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <Link to="/register">
          <button>Registration</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
