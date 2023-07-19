import { Box } from "@mui/material";
import VerifyForm from "../../components/VerifyForm/VerifyForm";
import { Link } from "react-router-dom";

function Verify() {
	return (
		<Box>
			<h1>Verify</h1>
            <VerifyForm />
            <div>
                <Link to="/login">
                    Login page
                </Link>
            </div>
            <div>
                <Link to="/register">
                    Back to register page
                </Link>
            </div>
		</Box>
	);
}

export default Verify;