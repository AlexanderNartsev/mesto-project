import Section from '../components/Section.js';
import { Card } from '../components/Card';
import { api } from '../components/Api';
import { cardListSection, userNameSelector, userActivitySelector } from '../components/utils/constants.js';
import { UserInfo } from '../components/UserInfo';

Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then((values) => {
  // Обработка карточек
  const cardsList = new Section({
    items: values[1],
    renderer: (item) => {
      const card = new Card(
        item, 
        '.element-template',
        values[0]._id,
        {
          handleLikeClick: (card) => {
            if (!card._likeButton.classList.contains("element__like_on")) {
              api.putLike(card._cardId)
                .then((dataCard) => {
                  card.setLikesInfo(dataCard);
                })
                .catch((err) => {
                  console.log(err);
                })
            }
            else {
              api.deleteLike(card._cardId)
                .then((dataCard) => {
                  card.setLikesInfo(dataCard);
                })
                .catch((err) => {
                  console.log(err);
                })
            }
          },
          deleteCard: (card) => {
            api.deleteOwnersCard(card._cardId)
            .then(() => {
              card.deleteCardElement();
            })
            .catch((err) => {
              console.log(err);
            });
          }
        }
        );

      const cardElement = card.generate();

      cardsList.setItem(cardElement);
      },
  },
    cardListSection
  );
  // отрисовка карточек
  cardsList.renderItems();

  // Обработка данных профиля
  const userInfo = new UserInfo(
    {userNameSelector, userActivitySelector},
    {
      getUserInfoApi: () => {
        api.getProfileInfo()
          .then((profileData) => {
            return profileData;
          })
          .catch((err) => {
            console.log(err);
          })
      },
      // patchProfileInfoApi: (name, about) => {
      //   Api.patchProfileInfo(name, about)

      // }
    }
  );
  })
  









import './index.css';
import { addCard, cardsArea, createCardHandle } from '../components/Card';
import { buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, openPopUpProfile, openPopupAddPlace, formProfile, submitFormProfile, formNewPlace, popUpProfileContainer, popUpNewPlaceContainer, popUpImageContainer, closeByOverlayOrButton, buttonOpenPopUpAvatar, openPopUpAvatar, popUpAvatarContainer, formAvatar, submitAvatar, profileName, profileActivityType, profileAvatar } from '../components/modal.js';
import { enableValidation, validationObject } from '../components/validate.js';
import { getCards, getProfileInfo } from '../components/Api';
import { UserInfo } from '../components/UserInfo.js';

export let profileId = '';

// Установка слушателей на элементы
buttonOpenPopUpProfile.addEventListener('click', openPopUpProfile);
buttonOpenPopUpNewPlace.addEventListener('click', openPopupAddPlace);
buttonOpenPopUpAvatar.addEventListener('click', openPopUpAvatar);
formProfile.addEventListener('submit', submitFormProfile);
formNewPlace.addEventListener('submit', createCardHandle);
formAvatar.addEventListener('submit', submitAvatar);

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

// Promise.all([
//   getProfileInfo(),
//   getCards()
// ])
//   .then((values) => {

//     profileId = values[0]._id;

//     profileName.textContent = values[0].name;
//     profileActivityType.textContent = values[0].about;
//     profileAvatar.setAttribute('src', values[0].avatar);
//     profileAvatar.setAttribute('alt', values[0].name);

//     values[1].forEach(cardData => {
//       addCard(cardData, cardsArea, profileId);
//     })
//   })
//   .catch((err) => {
//     console.log(err);
//   })

enableValidation(validationObject);