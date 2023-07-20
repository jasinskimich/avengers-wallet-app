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
            //zrobić powiadomenia dla errorów (maila istnieją i są zweryfikowane oraz maila, które nie istnieją), póki co wywalają się przez 
            //"TypeError: Cannot read properties of null (reading 'verify')"
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