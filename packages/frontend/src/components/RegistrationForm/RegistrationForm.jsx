import React, { useState } from "react";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
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

  const handleSubmit = () => {
    console.log(email, password, confirmPassword, firstName);
    setFirstName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <div>
        <div>
          <label>Email </label>
          <input type="email" id="email" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
        </div>
        <div>
          <label>Password </label>
          <input type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
        </div>
        <div>
          <label>Confirm Password </label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
        </div>
        <div>
          <label>First Name </label>
          <input type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
        </div>
      </div>
      <div>
        <button onClick={() => handleSubmit()} type="submit">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
