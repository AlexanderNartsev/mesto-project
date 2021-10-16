import { putLike, deleteOwnersCard, postNewCard, deleteLike, getProfileInfo } from "./api.js";
import { openImage, page, popUpNewPlace, closePopUp, popUpNewPlaceContainer, profileName, profileActivityType, profileAvatar } from "./modal.js";

export const cardsArea = page.querySelector('.elements');

// Сформировать карточку (без добавления на страницу)
export function createCard(cardData) {
  const cardTemplate = page.querySelector('#element-template').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardLabel = card.querySelector('.element__label');
  const cardLikeCounter = card.querySelector('.element__like-counter');

  const cardId = cardData._id;

  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardLabel.textContent = cardData.name;

  // Добавить обработчик на лайк
  const likeButton = card.querySelector('.element__like');

  getProfileInfo(profileName, profileActivityType, profileAvatar)
    .then(data => {
      if (cardData.likes) {
        cardLikeCounter.textContent = cardData.likes.length;
        cardData.likes.forEach(el => {
          if (el._id === data._id) {
            likeButton.classList.add("element__like_on");
          }
        });
      }

      if (!cardData.owner || cardData.owner._id === data._id) {
        // Добавить обработчик на удаление

        const deleteButton = card.querySelector('.element__delete');

        function deleteCard(event) {

          const card = event.target.closest('.element');
          card.remove();
          deleteOwnersCard(cardId);

        }

        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', deleteCard);

      }
    })

  // Добавить уже установленные лайки

  function like() {

    if (!likeButton.classList.contains("element__like_on")) {
      putLike(cardId);
      cardLikeCounter.textContent++;
    }
    else {
      deleteLike(cardId);
      cardLikeCounter.textContent--;
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
export function addCard(cardData, cardsArea) {
  const card = createCard(cardData);
  cardsArea.prepend(card);
}

// Создать карточку вручную
export function createCardHandle(event) {

  // Отключить стандартное поведение
  event.preventDefault();
  // Определить значения полей формы
  const name = popUpNewPlace.querySelector('.form__item[name=name]').value;
  const link = popUpNewPlace.querySelector('.form__item[name=url]').value;

  postNewCard(name, link);

  addCard({ name, link }, cardsArea);

  closePopUp(popUpNewPlaceContainer);
  popUpNewPlace.reset();

}