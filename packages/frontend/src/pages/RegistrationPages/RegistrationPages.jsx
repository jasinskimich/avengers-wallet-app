import React from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPages.module.css";
import RegistrationPageIcon from '../../images/RegistrationPageIcon.svg'

const RegistrationPages = () => {
    return (
        <div className={css.bodyContainer}>
            <div className={css.container}>
                <img class={css.registartionIcon}
                    src={RegistrationPageIcon}
                    alt="Frame"
                    />
                <div className={css.registartionPagesName}>
                    <p className={css.registartionPagesNameItem}>Finance App</p>
                </div>
            </div>
            <RegistrationForm />
        </div>
    )
}

export default RegistrationPages;
