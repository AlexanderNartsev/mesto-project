import './pages/index.css';
import { createCard, addCard, cardsArea, createCardHandle } from './components/card.js';
import { initialCards } from './components/initial-сards.js';
import { buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, openPopUpProfile, openPopupAddPlace, popUpProfile, submitFormProfile, popUpNewPlace, page, popUpProfileContainer, popUpNewPlaceContainer, popUpImageContainer, closePopUp, buttonClosePopUpNewPlace, buttonClosePopUpProfile, buttonClosePopUpImage, close } from './components/modal.js';
import { enableValidation } from './components/validate.js';

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

enableValidation();