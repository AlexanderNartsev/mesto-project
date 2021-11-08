export const cardListSection = '.elements';
export const userNameSelector = '.profile__name';
export const userActivitySelector = '.profile__text';

export const validationObject = {

  formSelector: '.form-container',
  inputSelector: '.form__item',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_condition_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'error_active'

}

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

export const nameInput = popUpProfileContainer.querySelector('.form__item[name=name]');
export const aboutInput = popUpProfileContainer.querySelector('.form__item[name=about]');