import { Box } from "@mui/material";
import VerifyForm from "../../components/VerifyForm/VerifyForm";
import { Link } from "react-router-dom";

function Verify() {
	return (
		<Box>
			<h1>Verify</h1>
            <VerifyForm />
            <Link to="/login">
                Login page
            </Link>
		</Box>
	);
}

export default Verify;
