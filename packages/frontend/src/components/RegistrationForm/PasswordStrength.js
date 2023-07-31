import React from "react";
import zxcvbn from "zxcvbn";
import "./PasswordStrength.css";

const PasswordStrength = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const progressColor = () => {
    switch (testResult.score) {
      case 0:
        return "veryWeak";
      case 1:
        return "weak";
      case 2:
        return "weak";
      case 3:
        return "normal";
      case 4:
        return "strong";
      default:
        return "";
    }
  };

  const createPasswordLabel = () => {
    switch (testResult.score) {
      case 0:
        return "";
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Normal";
      case 4:
        return "Strong :)";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="progress">
        <div
          className={`progress_bar ${progressColor()}`}
          style={{ width: `${num}%` }}
        ></div>
      </div>
      <p className={`text_pr `}>{createPasswordLabel()}</p>
    </>
  );
};

export default PasswordStrength;
