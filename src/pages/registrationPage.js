import React from "react";
import Register from "../components/Register";
import { Link } from "react-router-dom";
import logo from "../images/header-logo.svg";
import InfoTooltip from "../components/InfoTooltip";
import imageStatusError from "../images/image-status-error.png";

const RegistrationPage = ({
  isloggedIn,
  registerUser,
  errorMessage,
  isOpen,
  onClose,
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
      <InfoTooltip
        onClose={onClose}
        isOpen={isOpen}
        textStatus={"Что-то пошло не так! Попробуйте ещё раз."}
        imageStatus={imageStatusError}
      />
    </>
  );
};

export default RegistrationPage;
