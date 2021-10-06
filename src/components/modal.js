import { validationObject, toggleButtonState, isValid } from './validate.js';

// modal
export const page = document.querySelector('.page');
// Формы
export const popUpProfile = page.querySelector('.edit-form');
export const popUpNewPlace = page.querySelector('.add-form');
const popUpImage = page.querySelector('.image-popup');

// Кнопки закрытия форм
export const buttonClosePopUpProfile = popUpProfile.querySelector('.button_type_close');
export const buttonClosePopUpNewPlace = popUpNewPlace.querySelector('.button_type_close');
export const buttonClosePopUpImage = popUpImage.querySelector('.button_type_close');

// Контейнеры форм
export const popUpProfileContainer = popUpProfile.closest('.form-container');
export const popUpNewPlaceContainer = popUpNewPlace.closest('.form-container');
export const popUpImageContainer = popUpImage.closest('.form-container');

// Кнопки страницы
export const buttonOpenPopUpProfile = page.querySelector('.button_type_edit');
export const buttonOpenPopUpNewPlace = page.querySelector('.button_type_add');

// Данные профиля
const profileName = page.querySelector('.profile__name');
const profileActivityType = page.querySelector('.profile__text');

// Поля ввода форм
const profileNameInput = popUpProfile.querySelector('.form__item[name=name]');
const profileActivityTypeInput = popUpProfile.querySelector('.form__item[name=activity-type]');

//Закрыть клавишей
function closeByKey(popUp, evt) {
  if (evt.key === 'Escape') {
    closePopUp(popUp);
  };
}

// Открыть PopUp
function openPopUp(popUp, object) {
  popUp.classList.add('form-container_opened');

  page.addEventListener('keydown', (evt) => {
    closeByKey(popUp, evt);
  });

  const inputList = Array.from(popUp.querySelectorAll(object.inputSelector));
  const buttonElement = popUp.querySelector(object.submitButtonSelector);

  if (inputList) {
    inputList.forEach((inputEl) => {
      isValid(popUp, inputEl, object);
    });
  }

  if (buttonElement) {
    toggleButtonState(inputList, buttonElement, object);
  }

}

// Закрыть PopUp
export function closePopUp(popUp) {
  page.removeEventListener('keydown', (evt) => {
    closeByKey(popUp, evt);
  });
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

  // Закрыть модальное окно
  closePopUp(popUpProfileContainer);
};

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

};

// Закрыть поп-ап
export function closeByOverlayOrButton(evt, popUp, button) {
  if (evt.target === popUp || evt.target.parentElement === button) {
    closePopUp(popUp);
  };
};