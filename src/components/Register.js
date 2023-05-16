import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ registerUser, errorMessage }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const input = evt.target;
    setForm({
      ...form,
      [input.name]: input.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(form);
  };

  return (
    <div className="register">
      <form className="sign-form" onSubmit={handleSubmit}>
        <h1 className="sign-form__title">Регистрация</h1>
        <input
          className="sign-form__input"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          required
        ></input>
        <input
          className="sign-form__input"
          type="password"
          placeholder="Пароль"
          name="password"
          value={form.password || ""}
          onChange={handleChange}
          required
        ></input>
        <button className="sign-form__button" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="sign-form__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
