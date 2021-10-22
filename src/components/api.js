export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // Загрузить начальные карточки
  getInitialCards() {

    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // Загрузить данные профиля
  getProfileInfo() {

    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // Изменить данные профиля
  patchProfileInfo(name, about) {

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // Добавить карточку
  postNewCard(name, link) {

    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //Удалить карточку
  deleteOwnersCard(cardId) {

    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // Установить лайк
  putLike(cardId) {

  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: this._headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Cнять лайк
  deleteLike(cardId) {

  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: this._headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Обновить аватар
  patchAvatar(avatarLink) {

  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
  headers: {
    authorization: '24147bd1-3537-4148-b1a3-03fa93402c41',
    'Content-Type': 'application/json'
  }
}); 
