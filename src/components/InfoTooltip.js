import React from "react";
import imageStatus from "../images/image-status.png";

const InfoTooltip = ({ onClose, isOpen }) => {
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
          src={imageStatus}
          alt="Здесь показан статус регистрации"
        ></img>
        <p className="popup__text-status">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
