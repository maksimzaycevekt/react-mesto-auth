import { useState, useEffect } from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import MainPage from "../pages/mainPage.js";
import RegistrationPage from "../pages/registrationPage.js";
import LoginPage from "../pages/loginPage.js";

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import * as mestoAuth from "../utils/mestoAuth.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  //стейт со статусом пользователя
  const [isloggedIn, setIsLoggedIn] = useState(false);
  //стейт для хранения токена
  const [token, setToken] = useState("");
  //стейт для хранения ошибки регистрации
  const [registrationError, setRegistrationError] = useState("");
  //стейт для хранения ошибки авторизации
  const [loginError, setLoginError] = useState("");
  //стейт хренит объект с password и email
  const [userData, setUserData] = useState({});

  //хук для перенаправления/навигации
  const navigate = useNavigate();

  //стейт хранит в себе данные пользователя
  const [currentUser, setСurrentUser] = useState({});

  //стейт хранит в себе объект с карточками
  const [cards, setCards] = useState([]);

  //стейты для попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);

  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);

  const [isTooltipErrorPopupOpen, setIsTooltipErrorPopupOpen] = useState(false);

  //стейт для карточек
  const [selectedCard, setSelectedCard] = useState({});

  //обновляет токен в стейте
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
  }, [token]);

  //если передан токен производит авторизацию
  useEffect(() => {
    if (!token || isloggedIn) {
      return;
    }
    mestoAuth.getContent(token).then((user) => {
      setUserData(user.data);
      setIsLoggedIn(true);
      navigate("/");
    });
  }, [token, isloggedIn, navigate]);

  //ф-я регистрации передаётся пропсом в regiser, оттуда срабатывает по клику на кнопку 'зарегистрироваться'
  //записывает id из ответа в локальное хранилище и в стейт id
  const registerUser = (password, email) => {
    mestoAuth
      .register(password, email)
      .then(() => {
        navigate("/");
        setIsTooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipErrorPopupOpen(true);
        setRegistrationError("Что-то пошло не так! Попробуйте ещё раз.");
      });
  };

  //ф-я авторизации срабатывает по нажатию 'Войти'
  const loginUser = (password, email) => {
    mestoAuth
      .autorisation(password, email)
      .then((res) => {
        setToken(res.token);
        localStorage.setItem("jwt", res.token);

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoginError("Что-то пошло не так! Попробуйте ещё раз.");
      });
  };

  //выход из аккаунта
  const logOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setUserData({});
    navigate("/sign-in");
  };

  //при монтировании запрашивает данные пользователя с сервера
  //передаёт их в стейт currentUser
  useEffect(() => {
    if (!isloggedIn) {
      return;
    }
    api
      .getInfoUser()
      .then((info) => {
        setСurrentUser(info);
      })
      .catch((err) => console.log(err));
  }, [isloggedIn]);

  //при монтировании запрашивает карточки с сервера
  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, [isloggedIn]);

  //слушатели для попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDeletePopupClick() {
    setIsConfirmDeletePopupOpen(true);
  }

  //закрывает все попапы
  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setIsTooltipErrorPopupOpen(false);
    setSelectedCard({});
  }

  //обновляет стейт selectedCard
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //отправляет обновлённые данные профиля на сервер
  //при сабмите попапа ред. профиля
  function handleUpdateUser(object) {
    api
      .setUserInfo(object)
      .then((res) => {
        setСurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //отправляет url на сервер при сабмите попапа ред. аватара
  function handleUpdateAvatar(url) {
    api
      .setUserAvatar(url)
      .then((res) => {
        setСurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //отправляет данные новой карточки на сервер
  //при сабмите попапа добавления карточки
  function handleAddCard(cardInfo) {
    api
      .postCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //отвечает за работу лайков/дизлайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //отвечает за удаление карточек по клику на урну
  function handleDeliteCard(id) {
    const cardUpdate = cards.filter((card) => card._id !== id);
    api
      .deleteCard(id)
      .then(() => {
        setCards(cardUpdate);
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          {/* переадресация пользователя если авторизован или неавторизован*/}
          <Route
            path="/"
            element={
              <ProtectedRoute
                userData={userData}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeliteCard}
                onConfirmDeletePopupClick={handleConfirmDeletePopupClick}
                component={MainPage}
                loggedIn={isloggedIn}
                logOut={logOut}
              />
            }
          />
          {/* для регистрации */}
          <Route
            path="/sign-up"
            element={
              <RegistrationPage
                isloggedIn={isloggedIn}
                registerUser={registerUser}
                errorMessage={registrationError}
                isOpen={isTooltipErrorPopupOpen}
                onClose={handleCloseAllPopups}
              />
            }
          />
          {/* для авторизации */}
          <Route
            path="/sign-in"
            element={
              <LoginPage
                isloggedIn={isloggedIn}
                loginUser={loginUser}
                errorMessage={loginError}
                isOpen={isTooltipPopupOpen}
                onClose={handleCloseAllPopups}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to={isloggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>
        <>
          {/* Попап для редактирования профиля */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleCloseAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* Попап для добалвения карточки */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleCloseAllPopups}
            onAddCard={handleAddCard}
          />

          {/* Попап для подтверждения удаления */}
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={handleCloseAllPopups}
            onCardDelete={handleDeliteCard}
          />

          {/* Попап для смены аватара */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleCloseAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* Попап в котором откроется увеличенная картинка из карточки */}
          <ImagePopup onClose={handleCloseAllPopups} card={selectedCard} />
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
