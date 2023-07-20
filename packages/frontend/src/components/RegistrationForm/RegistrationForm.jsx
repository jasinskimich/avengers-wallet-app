import React, { useState } from "react";
import { Link } from "react-router-dom";
import Notiflix from 'notiflix';

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (!email || !name || !password || !confirmPassword) {
      Notiflix.Notify.warning('Email, password or name is empty, please complete the missing content.')
      return;
    }

    if (password !== confirmPassword) {
      Notiflix.Notify.warning('Passwords do not match, please try again.');
      return;
    }

    try{
      let response = await fetch(`http://localhost:5000/api/users/checkEmail/${email}`);
      response = await response.json();

      if(response.exists) {
        Notiflix.Notify.warning('Email already exists in the database. Please use a different email.');
        return;
      }
      
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
      <div>
        <label>Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => handleInputChange(e)} 
          placeholder="Email"
          required 
        />
      </div>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => handleInputChange(e)} 
          placeholder="Password"
          minLength={6}
          maxLength={12}
          required 
        />
      </div>
      <div>
        <label>Confirm password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          value={confirmPassword} 
          onChange={(e) => handleInputChange(e)} 
          placeholder="Confirm Password"
          minLength={6}
          maxLength={12}
          required 
        />
      </div>
      <div>
        <label>First Name</label>
        <input 
          type="text"
          id="name" 
          value={name} 
          onChange={(e) => handleInputChange(e)} 
          placeholder="First Name"
          minLength={1}
          maxLength={12}
          required 
        />
      </div>
      <button type="submit">
        Register
      </button>

      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>

      <div>
        <Link to="/verify">
          If you didn't get an verification email click this link.
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
