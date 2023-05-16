import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const MainPage = ({
  userData,
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onConfirmDeletePopupClick,
  component,
  loggedIn,
  logOut,
}) => {
  return (
    <>
      <Header logOut={logOut} userData={userData} />
      <Main
        cards={cards}
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        onConfirmDeletePopupClick={onConfirmDeletePopupClick}
        component={component}
        loggedIn={loggedIn}
      />
      <Footer />
    </>
  );
};

export default MainPage;
