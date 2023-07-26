import { Box } from "@mui/material";
import VerifyForm from "../../components/VerifyForm/VerifyForm";
import css from './VerifyPage.module.css'

function Verify() {
	return (
		<Box className={css.margins}>
            <h1 className={css.verifyHeader}>Verification Page</h1>
            <div className={css.main}>
                <VerifyForm />
            </div>    
		</Box>
	);
}

export default Verify;