import { Box } from "@mui/material";
import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import css from './ForgotPasswordPage.module.css'

function ForgotPassword() {
    return (
        <Box className={css.margins}>
            <h1 className={css.verifyHeader}>Verification Page</h1>
            <div className={css.main}>
                <ForgotPasswordForm />
            </div>
        </Box>
    );
}

export default ForgotPassword;