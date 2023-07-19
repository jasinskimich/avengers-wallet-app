import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

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
    // if (id === "confirmPassword") {
    //   setConfirmPassword(value);
    // }
  };

  const handleSubmit = async (e) => {
    // console.log(email, password, confirmPassword, firstName);
    console.log(email, password, name);
    let result = await fetch('http://localhost:5000/api/users/signup', {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json();
    console.warn(result);
    if (result) {
      alert("Data saved succesfully");
      setName("");
      setEmail("");
      setPassword("");
    }
    // setConfirmPassword("");
  };

  return (
    <form action="">
      <div>
        <label>Email </label>
        <input type="email" id="email" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
      </div>
      <div>
        <label>Password </label>
        <input type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
      </div>
      <div>
        <label>First Name </label>
        <input type="text" value={name} onChange={(e) => handleInputChange(e)} id="name" placeholder="First Name" />
      </div>
      <button onClick={() => handleSubmit()} type="submit">
        Register
      </button>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </form>
  );
};

export default RegistrationForm;
