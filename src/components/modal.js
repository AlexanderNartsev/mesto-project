import { createCardHandle } from "./card.js";
import { page } from "../index.js";

// Формы
const popUpProfile = page.querySelector('.edit-form');
export const popUpNewPlace = page.querySelector('.add-form');
const popUpImage = page.querySelector('.image-popup');

// Кнопки закрытия форм
const buttonClosePopUpProfile = popUpProfile.querySelector('.button_type_close');
const buttonClosePopUpNewPlace = popUpNewPlace.querySelector('.button_type_close');
const buttonClosePopUpImage = popUpImage.querySelector('.button_type_close');

// Контейнеры форм
const popUpProfileContainer = popUpProfile.closest('.form-container');
export const popUpNewPlaceContainer = popUpNewPlace.closest('.form-container');
const popUpImageContainer = popUpImage.closest('.form-container');

// Кнопки страницы
const buttonOpenPopUpProfile = page.querySelector('.button_type_edit');
const buttonOpenPopUpNewPlace = page.querySelector('.button_type_add');

// Данные профиля
let profileName = page.querySelector('.profile__name');
let profileActivityType = page.querySelector('.profile__text');

// Поля ввода форм
let profileNameInput = popUpProfile.querySelector('.form__item[name=name]');
let profileActivityTypeInput = popUpProfile.querySelector('.form__item[name=activity-type]');

// Открыть PopUp
function openPopUp(popUp) {
  popUp.classList.add('form-container_opened');
}

// Закрыть PopUp
export function closePopUp(popUp) {

  popUp.classList.remove('form-container_opened');

};

// Открыть модальное окно "Редактировать профиль"
function openPopUpProfile() {
  openPopUp(popUpProfileContainer);

  // Присвоить текущие значения профиля полям формы
  profileNameInput.value = profileName.textContent;
  profileActivityTypeInput.value = profileActivityType.textContent;
}

// Сохранение данных профиля
function submitFormProfile(event) {
  // Отключить стандартное поведение
  event.preventDefault();

  // Присвоить введённые значения на форме полям профиля
  profileName.textContent = profileNameInput.value;
  profileActivityType.textContent = profileActivityTypeInput.value;

  // Закрыть модальное окно
  closePopUp(popUpProfileContainer);
};

// Открыть модальное окно "Добавить место"
function openPopupAddPlace() {
  openPopUp(popUpNewPlaceContainer);
}

// Открыть модальное окно с изображением
export function openImage(event) {
  openPopUp(popUpImageContainer);

  let imageUrl = popUpImageContainer.querySelector('.image-popup__image').getAttribute('src');
  let imageName = popUpImageContainer.querySelector('.image-popup__image').getAttribute('alt');

  imageUrl = event.target.getAttribute('src');
  imageName = event.target.getAttribute('alt');

  popUpImageContainer.querySelector('.image-popup__image').setAttribute('src', imageUrl);
  popUpImageContainer.querySelector('.image-popup__name').textContent = imageName;
};

// Закрыть поп-ап
function close(evt, popUp, button) {

  if (evt.target === popUp || evt.target.parentElement === button) {

    closePopUp(popUp);

  };

};

// Установка слушателей на элементы
buttonOpenPopUpProfile.addEventListener('click', openPopUpProfile);
buttonOpenPopUpNewPlace.addEventListener('click', openPopupAddPlace);
popUpProfile.addEventListener('submit', submitFormProfile);
popUpNewPlace.addEventListener('submit', createCardHandle);

page.addEventListener('keydown', function (evt) {

  if (evt.key === 'Escape') {

    const popUpOpened = page.querySelector('.form-container_opened');

    closePopUp(popUpOpened);

  }

});

popUpProfileContainer.addEventListener('click', (evt) => {

  close(evt, popUpProfileContainer, buttonClosePopUpProfile)

});

popUpNewPlaceContainer.addEventListener('click', (evt) => {

  close(evt, popUpNewPlaceContainer, buttonClosePopUpNewPlace)

});

popUpImageContainer.addEventListener('click', (evt) => {

  close(evt, popUpImageContainer, buttonClosePopUpImage)

});