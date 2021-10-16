import './index.css';
import { cardsArea, createCardHandle } from '../components/card';
import { buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, openPopUpProfile, openPopupAddPlace, popUpProfile, submitFormProfile, popUpNewPlace, page, popUpProfileContainer, popUpNewPlaceContainer, popUpImageContainer, closePopUp, buttonClosePopUpNewPlace, buttonClosePopUpProfile, buttonClosePopUpImage, closeByOverlayOrButton, profileName, profileActivityType, profileAvatar, buttonOpenPopUpAvatar, openPopUpAvatar, popUpAvatarContainer, buttonClosePopUpAvatar, popUpAvatar, submitAvatar } from '../components/modal.js';
import { enableValidation, validationObject } from '../components/validate.js';
import { getCards, getProfileInfo } from '../components/api';

// Установка слушателей на элементы
buttonOpenPopUpProfile.addEventListener('click', openPopUpProfile);
buttonOpenPopUpNewPlace.addEventListener('click', openPopupAddPlace);
buttonOpenPopUpAvatar.addEventListener('click', openPopUpAvatar);
popUpProfile.addEventListener('submit', submitFormProfile);
popUpNewPlace.addEventListener('submit', createCardHandle);
popUpAvatar.addEventListener('submit', submitAvatar);

popUpProfileContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpProfileContainer, buttonClosePopUpProfile)

});

popUpNewPlaceContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpNewPlaceContainer, buttonClosePopUpNewPlace)

});

popUpImageContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpImageContainer, buttonClosePopUpImage)

});

popUpAvatarContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpAvatarContainer, buttonClosePopUpAvatar)

});

getProfileInfo(profileName, profileActivityType, profileAvatar);

getCards(cardsArea);

enableValidation(validationObject);