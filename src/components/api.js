const apiConfig = {

  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
  headers: {
    authorization: '24147bd1-3537-4148-b1a3-03fa93402c41',
    'Content-Type': 'application/json'
  }

};

// Загрузить данные профиля
export const getProfileInfo = () => {

  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })
}

// Загрузить начальные карточки
export function getCards() {

  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })
}

// Изменить данные профиля
export function patchProfileInfo(name, about) {

  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
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
export function postNewCard(name, link) {

  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
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

// Удалить карточку
export function deleteOwnersCard(cardId) {

  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })

}

// Установить лайк
export function putLike(cardId) {

  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })

}

// Cнять лайк
export function deleteLike(cardId) {

  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return promise.reject(`Ошибка: ${res.status}`);
    })

}

// Обновить аватар
export function patchAvatar(avatarLink) {

  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
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