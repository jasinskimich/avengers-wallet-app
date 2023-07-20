import { Box } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <Box>
      <div>
        <div>
          <h1>Finance App</h1>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </Box>
  );
}

export default Login;
