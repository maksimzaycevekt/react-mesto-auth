export const BASE_URL = "https://auth.nomoreparties.co";

//общая логика запросов вынесена в отдельную функцию
const makeRequest = (url, method, body, token) => {
  const options = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  if (token) {
    options.headers.authorization = `Bearer ${token}`;
  }
  return fetch(`${BASE_URL}${url}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка код ${res.status}`);
  });
};

//запрос для регистрации
export const register = ({ password, email }) => {
  return makeRequest("/signup", "POST", { password, email }, null);
};

//запрос для авторизации
export const autorisation = ({ password, email }) => {
  return makeRequest("/signin", "POST", { password, email }, null);
};

//запрос: проверка токена и получение контента
export const getContent = (token) => {
  return makeRequest("/users/me", "GET", null, token);
};
