import { openImage, page, popUpNewPlace, closePopUp, popUpNewPlaceContainer } from "./modal.js";
// Область добавления карточек

// export const page = document.querySelector('.page');
export const cardsArea = page.querySelector('.elements');

// Сформировать карточку (без добавления на страницу)
export function createCard(cardData) {
  const cardTemplate = page.querySelector('#element-template').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);

  const cardImage = card.querySelector('.element__image');
  const cardLabel = card.querySelector('.element__label');

  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardLabel.textContent = cardData.name;

  // Добавить обработчик на лайк
  const likeButton = card.querySelector('.element__like');

  function like(event) {
    event.target.classList.toggle("element__like_on");
  }

  likeButton.addEventListener('click', like);

  // Добавить обработчик на удаление
  const deleteButton = card.querySelector('.element__delete');

  function deleteCard(event) {
    event.target.closest('.element').remove();
  }

  deleteButton.addEventListener('click', deleteCard);

  // Добавить обработчик на открытие изображения
  let placeImage = card.querySelector('.element__image');

  placeImage.addEventListener('click', openImage);

  // Вернуть сформированную карточку
  return card;

};

// Добавить карточку
export function addCard(cardData, cardsArea) {

  const card = createCard(cardData);
  cardsArea.prepend(card);

};

// Создать карточку вручную
export function createCardHandle(event) {

  // Отключить стандартное поведение
  event.preventDefault();

  // Определить значения полей формы
  const name = popUpNewPlace.querySelector('.form__item[name=name]').value;
  const link = popUpNewPlace.querySelector('.form__item[name=url]').value;

  addCard({ name, link }, cardsArea);

  closePopUp(popUpNewPlaceContainer);

  popUpNewPlace.reset();
}