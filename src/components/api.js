export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // Загрузить начальные карточки
  getInitialCards() {

    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Загрузить данные профиля
  getProfileInfo() {

    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse);
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
    .then(this._checkResponse);
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
    .then(this._checkResponse);
  }

  //Удалить карточку
  deleteOwnersCard(cardId) {

    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Установить лайк
  putLike(cardId) {

  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: this._headers
  })
    .then(this._checkResponse);
  }

  // Cнять лайк
  deleteLike(cardId) {

  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: this._headers
  })
    .then(this._checkResponse);
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
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
  headers: {
    authorization: '24147bd1-3537-4148-b1a3-03fa93402c41',
    'Content-Type': 'application/json'
  }
}); 
