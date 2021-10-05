import './pages/index.css';
import { createCard, addCard, cardsArea, createCardHandle } from './components/card.js';
import { initialCards } from './components/initial-сards.js';
import { buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, openPopUpProfile, openPopupAddPlace, popUpProfile, submitFormProfile, popUpNewPlace, page, popUpProfileContainer, popUpNewPlaceContainer, popUpImageContainer, closePopUp, buttonClosePopUpNewPlace, buttonClosePopUpProfile, buttonClosePopUpImage, close } from './components/modal.js';

// Создать стандартные карточки из массива
initialCards.forEach(function (cardData) {

  createCard(cardData);
  addCard(cardData, cardsArea);

});

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

function setEventListeners(formEl) {

  const inputList = Array.from(formEl.querySelectorAll('.form__item'));
  const buttonElement = formEl.querySelector('.button_type_save');

  inputList.forEach((inputEl) => {

    inputEl.addEventListener('input', () => {

      isValid(formEl, inputEl);

      toggleButtonState(inputList, buttonElement);

    });

  });

};

export function enableValidation() {

  const formList = Array.from(document.querySelectorAll('.form-container'));

  formList.forEach((formEl) => {

    formEl.addEventListener('submit', (evt) => {

      evt.preventDefault();

    });

    setEventListeners(formEl);

  });

};

enableValidation();