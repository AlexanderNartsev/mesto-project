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
export function openPopUpProfile() {
  openPopUp(popUpProfileContainer);

  // Присвоить текущие значения профиля полям формы
  profileNameInput.value = profileName.textContent;
  profileActivityTypeInput.value = profileActivityType.textContent;
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
export function close(evt, popUp, button) {

  if (evt.target === popUp || evt.target.parentElement === button) {

    closePopUp(popUp);

  };

};