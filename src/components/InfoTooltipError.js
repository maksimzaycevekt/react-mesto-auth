import React from "react";
import imageStatusError from "../images/image-status-error.png";

const InfoTooltipError = ({ onClose, isOpen }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup_type_tooltip">
        <button
          className="popup__close-button"
          onClick={onClose}
          id="close-popup-profile"
          type="button"
          aria-label="Закрыть"
        ></button>
        <img
          className="popup__image-status"
          src={imageStatusError}
          alt="Здесь показан статус регистрации"
        ></img>
        <p className="popup__text-status">
          Что-то пошло не так! Попробуйте ещё раз.
        </p>
      </div>
    </div>
  );
};

export default InfoTooltipError;
