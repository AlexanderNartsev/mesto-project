import { patchAvatar, patchProfileInfo } from './Api.js';
import { validationObject, resetValidation } from './validate.js';

// modal
export const page = document.querySelector('.page');
// Формы
export const formProfile = page.querySelector('.edit-form');
export const formNewPlace = page.querySelector('.add-form');
export const formAvatar = page.querySelector('.avatar-form');
const popUpImage = page.querySelector('.image-popup');

// Кнопки закрытия форм
export const buttonClosePopUpProfile = formProfile.querySelector('.button_type_close');
export const buttonClosePopUpNewPlace = formNewPlace.querySelector('.button_type_close');
export const buttonClosePopUpImage = popUpImage.querySelector('.button_type_close');
export const buttonClosePopUpAvatar = formAvatar.querySelector('.button_type_close');

// Контейнеры форм
export const popUpProfileContainer = formProfile.closest('.form-container');
export const popUpNewPlaceContainer = formNewPlace.closest('.form-container');
export const popUpImageContainer = popUpImage.closest('.form-container');
export const popUpAvatarContainer = formAvatar.closest('.form-container');

// Кнопки страницы
export const buttonOpenPopUpProfile = page.querySelector('.button_type_edit');
export const buttonOpenPopUpNewPlace = page.querySelector('.button_type_add');
export const buttonOpenPopUpAvatar = page.querySelector('.profile__avatar');

// Данные профиля
export const profileName = page.querySelector('.profile__name');
export const profileActivityType = page.querySelector('.profile__text');
export const profileAvatar = page.querySelector('.profile__avatar');

// Поля ввода форм
export const profileNameInput = formProfile.querySelector('.form__item[name=name]');
export const profileActivityTypeInput = formProfile.querySelector('.form__item[name=activity-type]');
export const profileAvatarInput = formAvatar.querySelector('.form__item[name=url]');

// Закрыть PopUp
export function closePopUp(popUp) {

  page.removeEventListener('keydown', closeByKey);
  popUp.classList.remove('form-container_opened');

};

//Закрыть клавишей
function closeByKey(evt) {
  if (evt.key === 'Escape') {
    const activePopUp = page.querySelector('.form-container_opened');
    closePopUp(activePopUp);
  };
}

// Открыть PopUp
function openPopUp(popUp, object) {

  popUp.classList.add('form-container_opened');
  page.addEventListener('keydown', closeByKey);

}

// Открыть модальное окно "Редактировать профиль"
export function openPopUpProfile() {

  // Присвоить текущие значения профиля полям формы
  profileNameInput.value = profileName.textContent;
  profileActivityTypeInput.value = profileActivityType.textContent;

  openPopUp(popUpProfileContainer, validationObject);
  resetValidation(popUpProfileContainer, validationObject);
}

export function renderLoading(isLoading, button, text) {

  const loadingText = 'Сохранение...'

  if (isLoading) {
    button.textContent = loadingText;
  }
  else {
    button.textContent = text;
  }
}

// Сохранение данных профиля
export function submitFormProfile(event) {
  // Отключить стандартное поведение
  event.preventDefault();

  const name = profileNameInput.value
  const activity = profileActivityTypeInput.value

  const button = formProfile.querySelector('.button_type_save')
  renderLoading(true, button)

  patchProfileInfo(name, activity)
    .then(() => {
      // Присвоить введённые значения на форме полям профиля
      profileName.textContent = name;
      profileActivityType.textContent = activity;

      // Закрыть модальное окно
      closePopUp(popUpProfileContainer);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button, 'Сохранить');
    })

}

//Сохранение аватара
export function submitAvatar(event) {
  // Отключить стандартное поведение
  event.preventDefault();

  const button = formAvatar.querySelector('.button_type_save')
  renderLoading(true, button)

  patchAvatar(profileAvatarInput.value)
    .then(() => {
      // Присвоить введённые значения на форме полям профиля
      profileAvatar.setAttribute('src', profileAvatarInput.value);

      // Закрыть модальное окно
      closePopUp(popUpAvatarContainer);
      formAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button, 'Сохранить');
    })

}

// Открыть модальное окно "Добавить место"
export function openPopupAddPlace() {
  openPopUp(popUpNewPlaceContainer, validationObject);
  resetValidation(popUpNewPlaceContainer, validationObject);
}

// Открыть модальное окно с изображением
export function openImage(event) {

  openPopUp(popUpImageContainer, validationObject);

  const imageUrl = event.target.getAttribute('src');
  const imageName = event.target.getAttribute('alt');

  popUpImageContainer.querySelector('.image-popup__image').setAttribute('src', imageUrl);
  popUpImageContainer.querySelector('.image-popup__image').setAttribute('alt', imageName);
  popUpImageContainer.querySelector('.image-popup__name').textContent = imageName;

}

// Открыть модальное окно "Изменить аватар"
export function openPopUpAvatar() {
  openPopUp(popUpAvatarContainer, validationObject);
  resetValidation(popUpAvatarContainer, validationObject);
}

// Закрыть поп-ап
export function closeByOverlayOrButton(evt, popUp) {

  if (evt.target === evt.currentTarget || evt.target.parentElement.classList.contains('button_type_close')) {
    closePopUp(popUp);
  };

}

