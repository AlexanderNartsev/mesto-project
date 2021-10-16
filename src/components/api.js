import { createCard, addCard } from "./card";

const apiConfig = {

  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
  headers: {
    authorization: '24147bd1-3537-4148-b1a3-03fa93402c41',
    'Content-Type': 'application/json'
  }

};

// Загрузить данные профиля
export function getProfileInfo(name, about, avatar) {

  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(data => {
      name.textContent = data.name;
      about.textContent = data.about;
      avatar.setAttribute('src', data.avatar);
      return data;
    })

}

// Загрузить начальные карточки
export function getCards(cardsArea) {

  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(data => {
      return data.forEach(cardData => {
        addCard(cardData, cardsArea);
      })
    });
}

// Изменить данные профиля
export function patchProfileInfo(nameInput, aboutInput) {

  fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: aboutInput.value
    })
  });

}

// Добавить карточку
export function postNewCard(nameInput, urlInput) {

  fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameInput,
      link: urlInput
    })
  });

}

// Удалить карточку
export function deleteOwnersCard(cardId) {

  fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  });

}

// Установить лайк
export function putLike(cardId) {

  fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  });

}

// Cнять лайк
export function deleteLike(cardId) {

  fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  });

}

// Обновить аватар
export function patchAvatar(avatarLink) {

  fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  });
}