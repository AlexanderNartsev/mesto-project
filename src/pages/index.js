import { userAvatarSelector, nameInput, aboutInput, popUpImageContainer, cardListSection, userNameSelector, userActivitySelector, validationObject, buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, popUpProfileContainer, popUpNewPlaceContainer, buttonOpenPopUpAvatar, popUpAvatarContainer, formProfile, formNewPlace, formAvatar } from '../utils/constants.js';
import Section from '../components/Section.js';
import { Card } from '../components/Card';
import { api } from '../components/Api';
import { UserInfo } from '../components/UserInfo';
import { FormValidator } from '../components/FormValidator.js';
import './index.css';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

let userId;
let section;
let userInfo;

Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then((values) => {
    // Обработка карточек
    section = new Section({
      items: values[1],
      renderer: (item) => {
        userId = values[0]._id;
        const card = createCard(item);

        const cardElement = card.generate();

        section.setItem(cardElement);
      },
    },
      cardListSection
    );
    // отрисовка карточек
    section.renderItems();

    // Обработка данных профиля
    userInfo = new UserInfo(
      { userNameSelector, userActivitySelector, userAvatarSelector },
      () => {
        return api.getProfileInfo()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          })
      },
      (name, about) => api.patchProfileInfo(name, about)
        .then(() => {
          popUpForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(false, formProfile, 'Сохранить');
        }),
      (url) => {
        api.patchAvatar(url)
          .then(() => {
            popUpAvatar.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            renderLoading(false, formAvatar, 'Сохранить');
          })
      }
    );

    userInfo.setUserInfo({ name: values[0].name, description: values[0].about, avatar: values[0].avatar });
  })

export let profileId = '';

// Функция отрисовки ожидания на кнопке
function renderLoading(isLoading, form, text) {
  const loadingText = 'Сохранение...'
  const button = form.querySelector('.button_type_save');

  if (isLoading) {
    button.textContent = loadingText;
  }
  else {
    button.textContent = text;
  }
}

const popUpForm = new PopupWithForm({
  popUp: popUpProfileContainer,
  func: (data) => {

    const name = data.name;
    const about = data.about;

    renderLoading(true, formProfile);

    userInfo.setUserInfo({ name: name, description: about, shouldUpdate: true });
  }
});

const popUpAvatar = new PopupWithForm({
  popUp: popUpAvatarContainer,
  func: (data) => {
    const url = data.url;

    renderLoading(true, formAvatar);

    userInfo.setUserInfo({ avatar: url, shouldUpdate: true });
  }
});

const popUpPlace = new PopupWithForm({
  popUp: popUpNewPlaceContainer,
  func: (data) => {
    const name = data.cardName;
    const link = data.cardUrl;

    renderLoading(true, formNewPlace);

    api.postNewCard(name, link)
      .then(
        data => {
          section.renderItem(data);
          popUpPlace.close();
        })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, formNewPlace, 'Создать')
      })
  }
});

const popUpFormValidator = new FormValidator(validationObject, formProfile);
const popUpAvatarValidator = new FormValidator(validationObject, formAvatar);
const popUpPlaceValidator = new FormValidator(validationObject, formNewPlace);
const popUpImage = new PopupWithImage(popUpImageContainer);

function createCard(cardData) {
  const card = new Card(
    cardData,
    'element-template',
    userId,
    {
      handleLikeClick: (thisCard) => {
        if (!thisCard.isLiked()) {
          api.putLike(thisCard._cardId)
            .then((dataCard) => {
              thisCard.setLikesInfo(dataCard);
            })
            .catch((err) => {
              console.log(err);
            })
        }
        else {
          api.deleteLike(thisCard._cardId)
            .then((dataCard) => {
              thisCard.setLikesInfo(dataCard);
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
      },
      openImagePopup: (cardUrl, cardName) => {
        popUpImage.open(cardUrl, cardName);
      }
    }
  );
  return card;
}

// Установка слушателей на элементы
buttonOpenPopUpProfile.addEventListener('click', () => {
  userInfo.getUserInfo()
    .then((res) => {
      nameInput.value = res.name;
      aboutInput.value = res.about;
      popUpForm.open();
      popUpFormValidator.resetValidation();
    })
});

buttonOpenPopUpAvatar.addEventListener('click', () => {
  popUpAvatar.open();
  popUpAvatarValidator.resetValidation();
});

buttonOpenPopUpNewPlace.addEventListener('click', () => {
  popUpPlace.open();
  popUpPlaceValidator.resetValidation();
});

popUpFormValidator.enableValidation();
popUpAvatarValidator.enableValidation();
popUpPlaceValidator.enableValidation();

popUpForm.setEventListeners();
popUpAvatar.setEventListeners();
popUpPlace.setEventListeners();
popUpImage.setEventListeners();