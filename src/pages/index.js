import './index.css';
import { createCard, addCard, cardsArea, createCardHandle } from '../components/card';
import { initialCards } from '../components/initial-сards.js';
import { buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, openPopUpProfile, openPopupAddPlace, popUpProfile, submitFormProfile, popUpNewPlace, page, popUpProfileContainer, popUpNewPlaceContainer, popUpImageContainer, closePopUp, buttonClosePopUpNewPlace, buttonClosePopUpProfile, buttonClosePopUpImage, closeByOverlayOrButton } from '../components/modal.js';
import { enableValidation, validationObject } from '../components/validate.js';

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

popUpProfileContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpProfileContainer, buttonClosePopUpProfile)

});

popUpNewPlaceContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpNewPlaceContainer, buttonClosePopUpNewPlace)

});

popUpImageContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpImageContainer, buttonClosePopUpImage)

});

enableValidation(validationObject);