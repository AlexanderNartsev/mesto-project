import './index.css';
import { addCard, cardsArea, createCardHandle } from '../components/card';
import { buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, openPopUpProfile, openPopupAddPlace, popUpProfile, submitFormProfile, popUpNewPlace, popUpProfileContainer, popUpNewPlaceContainer, popUpImageContainer, closeByOverlayOrButton, buttonOpenPopUpAvatar, openPopUpAvatar, popUpAvatarContainer, popUpAvatar, submitAvatar, profileName, profileActivityType, profileAvatar } from '../components/modal.js';
import { enableValidation, validationObject } from '../components/validate.js';
import { getCards, getProfileInfo } from '../components/api';

export let profileId = '';

// Установка слушателей на элементы
buttonOpenPopUpProfile.addEventListener('click', openPopUpProfile);
buttonOpenPopUpNewPlace.addEventListener('click', openPopupAddPlace);
buttonOpenPopUpAvatar.addEventListener('click', openPopUpAvatar);
popUpProfile.addEventListener('submit', submitFormProfile);
popUpNewPlace.addEventListener('submit', createCardHandle);
popUpAvatar.addEventListener('submit', submitAvatar);

popUpProfileContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpProfileContainer)

});

popUpNewPlaceContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpNewPlaceContainer)

});

popUpImageContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpImageContainer)

});

popUpAvatarContainer.addEventListener('click', (evt) => {

  closeByOverlayOrButton(evt, popUpAvatarContainer)

});

Promise.all([
  getProfileInfo(),
  getCards()
])
  .then((values) => {

    profileId = values[0]._id;

    profileName.textContent = values[0].name;
    profileActivityType.textContent = values[0].about;
    profileAvatar.setAttribute('src', values[0].avatar);
    profileAvatar.setAttribute('alt', values[0].name);

    values[1].forEach(cardData => {
      addCard(cardData, cardsArea, profileId);
    })

    return values

  })
  .catch((err) => {
    console.log(err);
  })

enableValidation(validationObject);