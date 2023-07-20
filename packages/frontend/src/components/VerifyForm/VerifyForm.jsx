import React, { useState } from "react";
import Notiflix from "notiflix";

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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email </label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => handleInputChange(e)} 
            placeholder="Email" />
        </div>
        <button type="submit">
          Send verification link again.
        </button>
      </form>
    );
};
  
export default VerifyForm;