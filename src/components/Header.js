import React from "react";
import logo from "../images/header-logo.svg";

function Header({ logOut, userData }) {
  function handeClick() {
    logOut();
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
      <div className="header__container">
        <p className="header__email">{userData.email}</p>
        <button className="header__link" type="button" onClick={handeClick}>
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;
