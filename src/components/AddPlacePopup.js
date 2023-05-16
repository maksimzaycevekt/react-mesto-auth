import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  //рефы на инпуты
  const cardName = useRef();
  const cardUrl = useRef();

  //передаёт value в app для api запроса
  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      cardName: cardName.current.value,
      cardLink: cardUrl.current.value,
    });
  }

  //обнуляет поля ввода после успешной отправки запроса
  useEffect(() => {
    cardName.current.value = "";
    cardUrl.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup-images"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitName={"Создать"}
    >
      <input
        className="popup__input popup__input_type_image-name"
        id="card-name"
        type="text"
        name="popup_mesto"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        required
        ref={cardName}
      />
      <span className="popup__input-error card-name-error"></span>
      <input
        className="popup__input popup__input_type_image-link"
        id="card-url"
        type="url"
        name="popup_link"
        placeholder="Ссылка на картинку"
        required
        ref={cardUrl}
      />
      <span className="popup__input-error card-url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
