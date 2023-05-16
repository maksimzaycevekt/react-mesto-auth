import React from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";
import logo from "../images/header-logo.svg";
import InfoTooltip from "../components/InfoTooltip";

const LoginPage = ({
  isloggedIn,
  loginUser,
  errorMessage,
  isOpen,
  onClose,
}) => {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Место" />
        <Link
          to="/sign-up"
          className="header__link"
          style={!isloggedIn && { color: "white" }}
        >
          Регистрация
        </Link>
      </header>
      <Login loginUser={loginUser} errorMessage={errorMessage} />
      <InfoTooltip onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default LoginPage;
