import { putLike, deleteOwnersCard, postNewCard, deleteLike } from "./api.js";
import { openImage, page, popUpNewPlace, closePopUp, popUpNewPlaceContainer, renderLoading } from "./modal.js";

export const cardsArea = page.querySelector('.elements');

// Сформировать карточку (без добавления на страницу)
export function createCard(cardData, profileId, cardpreId) {
  const cardTemplate = page.querySelector('#element-template').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardLabel = card.querySelector('.element__label');
  const cardLikeCounter = card.querySelector('.element__like-counter');
  let cardId = '';

  if (cardData._id) {
    cardId = cardData._id;
  } else {
    cardId = cardpreId
  }

  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardLabel.textContent = cardData.name;

  if (cardData.likes) {
    cardLikeCounter.textContent = cardData.likes.length;
  }

  // Добавить обработчик на лайк
  const likeButton = card.querySelector('.element__like');

  if (profileId && cardData.likes) {
    cardData.likes.forEach(el => {
      if (el._id === profileId) {
        likeButton.classList.add("element__like_on");
      }
    });

  }

  if (!cardData.owner || cardData.owner._id === profileId) {

    // Добавить обработчик на удаление
    const deleteButton = card.querySelector('.element__delete');

    function deleteCard(event) {

      deleteOwnersCard(cardId)
        .then(() => {
          const card = event.target.closest('.element');
          card.remove()
        })
        .catch((err) => {
          console.log(err);
        });

    }

    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', deleteCard);

  }

  // Добавить уже установленные лайки

  function like() {

    if (!likeButton.classList.contains("element__like_on")) {
      putLike(cardId)
        .then(() => {
          cardLikeCounter.textContent++;
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      deleteLike(cardId)
        .then(() => {
          cardLikeCounter.textContent--;
        })
        .catch((err) => {
          console.log(err);
        })
    }

    likeButton.classList.toggle("element__like_on");

  }

  likeButton.addEventListener('click', like);

  // Добавить обработчик на открытие изображения
  const placeImage = card.querySelector('.element__image');
  placeImage.addEventListener('click', openImage);

  // Вернуть сформированную карточку
  return card;

};

// Добавить карточку
export function addCard(cardData, cardsArea, profileId, cardpreId) {
  const card = createCard(cardData, profileId, cardpreId);
  cardsArea.prepend(card);
}

// Создать карточку вручную
export function createCardHandle(event) {

  // Отключить стандартное поведение
  event.preventDefault();
  // Определить значения полей формы
  const name = popUpNewPlace.querySelector('.form__item[name=name]').value;
  const link = popUpNewPlace.querySelector('.form__item[name=url]').value;

  const button = popUpNewPlace.querySelector('.button_type_save')
  renderLoading(true, button)

  postNewCard(name, link)

    .then(
      data => {

        const cardpreId = data._id
        addCard({ name, link }, cardsArea, {}, cardpreId);

        closePopUp(popUpNewPlaceContainer);
        popUpNewPlace.reset();
      })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, button, 'Создать')
    })
}