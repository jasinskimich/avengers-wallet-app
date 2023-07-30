import { Box } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPages.module.css";
import { useState } from "react";

function Login() {
  const [setLoggedName] = useState("");
  
  return (
    <Box>
      <div className={styles.main}>
        <div className={styles.titleContainer }>
          <div className={styles.logoPicture}></div>
          <div>
            <h1 className={styles.logoTitle}>Finance App</h1>
          </div>
        </div>
        
        <div className={styles.loginFormContainer}>
          <LoginForm setLoggedName={setLoggedName} />
        </div>
      </div>
    </Box>
  );
}

export default Login;
