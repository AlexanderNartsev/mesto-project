import { patchAvatar, patchProfileInfo } from './api.js';
import { validationObject, toggleButtonState, isValid } from './validate.js';

// modal
export const page = document.querySelector('.page');
// Формы
export const popUpProfile = page.querySelector('.edit-form');
export const popUpNewPlace = page.querySelector('.add-form');
export const popUpAvatar = page.querySelector('.avatar-form');
const popUpImage = page.querySelector('.image-popup');

// Кнопки закрытия форм
export const buttonClosePopUpProfile = popUpProfile.querySelector('.button_type_close');
export const buttonClosePopUpNewPlace = popUpNewPlace.querySelector('.button_type_close');
export const buttonClosePopUpImage = popUpImage.querySelector('.button_type_close');
export const buttonClosePopUpAvatar = popUpAvatar.querySelector('.button_type_close');

// Контейнеры форм
export const popUpProfileContainer = popUpProfile.closest('.form-container');
export const popUpNewPlaceContainer = popUpNewPlace.closest('.form-container');
export const popUpImageContainer = popUpImage.closest('.form-container');
export const popUpAvatarContainer = popUpAvatar.closest('.form-container');

// Кнопки страницы
export const buttonOpenPopUpProfile = page.querySelector('.button_type_edit');
export const buttonOpenPopUpNewPlace = page.querySelector('.button_type_add');
export const buttonOpenPopUpAvatar = page.querySelector('.profile__avatar');

// Данные профиля
export const profileName = page.querySelector('.profile__name');
export const profileActivityType = page.querySelector('.profile__text');
export const profileAvatar = page.querySelector('.profile__avatar');

// Поля ввода форм
export const profileNameInput = popUpProfile.querySelector('.form__item[name=name]');
export const profileActivityTypeInput = popUpProfile.querySelector('.form__item[name=activity-type]');
export const profileAvatarInput = popUpAvatar.querySelector('.form__item[name=url]');

//Закрыть клавишей
function closeByKey(evt) {
  const activePopUp = page.querySelector('.form-container_opened');
  if (evt.key === 'Escape') {
    closePopUp(activePopUp);
  };
}

// Открыть PopUp
function openPopUp(popUp, object) {
  popUp.classList.add('form-container_opened');

  page.addEventListener('keydown', closeByKey);

  const inputList = Array.from(popUp.querySelectorAll(object.inputSelector));
  const buttonElement = popUp.querySelector(object.submitButtonSelector);

  if (inputList) {
    inputList.forEach((inputEl) => {
      if (inputEl.value) {
        isValid(popUp, inputEl, object);
      }
    });
  }

  if (buttonElement) {
    toggleButtonState(inputList, buttonElement, object);
  }

}

// Закрыть PopUp
export function closePopUp(popUp) {
  page.removeEventListener('keydown', closeByKey);

  popUp.classList.remove('form-container_opened');
};

// Открыть модальное окно "Редактировать профиль"
export function openPopUpProfile() {

  // Присвоить текущие значения профиля полям формы
  profileNameInput.value = profileName.textContent;
  profileActivityTypeInput.value = profileActivityType.textContent;

  openPopUp(popUpProfileContainer, validationObject);
}

// Сохранение данных профиля
export function submitFormProfile(event) {
  // Отключить стандартное поведение
  event.preventDefault();

  // Присвоить введённые значения на форме полям профиля
  profileName.textContent = profileNameInput.value;
  profileActivityType.textContent = profileActivityTypeInput.value;

  patchProfileInfo(profileNameInput, profileActivityTypeInput)

  // Закрыть модальное окно
  closePopUp(popUp);
}

//Сохранение аватара
export function submitAvatar(event) {
  // Отключить стандартное поведение
  event.preventDefault();

  // Присвоить введённые значения на форме полям профиля
  profileAvatar.setAttribute('src', profileAvatarInput.value);

  patchAvatar(profileAvatarInput.value);

  // Закрыть модальное окно
  closePopUp(popUpAvatarContainer);
}

// Открыть модальное окно "Добавить место"
export function openPopupAddPlace() {
  openPopUp(popUpNewPlaceContainer, validationObject);
}

// Открыть модальное окно с изображением
export function openImage(event) {

  openPopUp(popUpImageContainer, validationObject);

  const imageUrl = event.target.getAttribute('src');
  const imageName = event.target.getAttribute('alt');

  popUpImageContainer.querySelector('.image-popup__image').setAttribute('src', imageUrl);
  popUpImageContainer.querySelector('.image-popup__name').textContent = imageName;

}

// Открыть модальное окно "Изменить аватар"
export function openPopUpAvatar() {
  openPopUp(popUpAvatarContainer, validationObject);
}

// Закрыть поп-ап
export function closeByOverlayOrButton(evt, popUp, button) {
  if (evt.target === popUp || evt.target.parentElement === button) {
    closePopUp(popUp);
  };
};