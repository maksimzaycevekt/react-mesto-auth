function PopupWithForm({
  isOpen,
  name,
  onClose,
  title,
  children,
  onSubmit,
  buttonSubmitName,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={name}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}
          id="close-popup-profile"
          type="button"
          aria-label="Закрыть"
        ></button>
        <h2 className="popup__text">{title}</h2>
        <form className="popup__form" id={name} name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" id="popup-add-image" type="submit">
            {buttonSubmitName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
