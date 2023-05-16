import React from "react";
import Register from "../components/Register";
import { Link } from "react-router-dom";
import logo from "../images/header-logo.svg";
import InfoTooltipError from "../components/InfoTooltipError";

const RegistrationPage = ({
  isloggedIn,
  registerUser,
  errorMessage,
  onClose,
  isOpen,
}) => {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Место" />
        <Link
          to="/sign-in"
          className="header__link"
          style={!isloggedIn && { color: "white" }}
        >
          Войти
        </Link>
      </header>
      <Register registerUser={registerUser} errorMessage={errorMessage} />
      <InfoTooltipError onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default RegistrationPage;
