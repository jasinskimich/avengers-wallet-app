import { Box } from "@mui/material";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import css from './ResetPasswordPage.module.css'

function ResetPassword() {
    return (
        <Box className={css.margins}>
            <h1 className={css.resetPasswordHeader}>Reset Password Page</h1>
            <div className={css.main}>
                <ResetPasswordForm />
            </div>
        </Box>
    );
}

export default ResetPassword;