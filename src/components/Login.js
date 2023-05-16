import { useState } from "react";

function Login({ loginUser, errorMessage }) {
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

    loginUser(form);
  };

  return (
    <div className="login">
      <form className="sign-form" onSubmit={handleSubmit}>
        <h1 className="sign-form__title">Войти</h1>
        <input
          className="sign-form__input"
          type="text"
          name="email"
          id="email"
          placeholder="Логин"
          value={form.email || ""}
          onChange={handleChange}
          required
        ></input>
        <input
          className="sign-form__input"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          value={form.password || ""}
          onChange={handleChange}
          required
        ></input>
        <button type="submit" className="sign-form__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
