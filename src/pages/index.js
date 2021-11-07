import { popUpImageContainer, cardListSection, userNameSelector, userActivitySelector, validationObject, buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, popUpProfileContainer, popUpNewPlaceContainer, buttonOpenPopUpAvatar, popUpAvatarContainer, formProfile, formNewPlace, formAvatar } from '../components/utils/constants.js';
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
      { userNameSelector, userActivitySelector },
      () => {api.getProfileInfo()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })},
      (name, about) => api.patchProfileInfo(name, about)
        .then(() => {
          PopupForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(false, formProfile, 'Сохранить');
        }),
      (url) => {
        console.log('test1');
        api.patchAvatar(url)
        .then(() => {
          PopUpAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(false, formAvatar, 'Сохранить');
        })}
    );

    userInfo.setUserInfo({name: values[0].name, description: values[0].about, avatar: values[0].avatar});
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

const PopupForm = new PopupWithForm({
  popUp: popUpProfileContainer,
  func: (data) => {
    
    const name = data.name;
    const about = data.about;

    renderLoading(true, formProfile);

    userInfo.setUserInfo({name: name, description: about, shouldUpdate: true});
  }
});

const PopUpAvatar = new PopupWithForm({
  popUp: popUpAvatarContainer,
  func: (data) => {
    const url = data.url;

    renderLoading(true, formAvatar);

    userInfo.setUserInfo({avatar: url, shouldUpdate: true});
  }
});

const PopUpPlace = new PopupWithForm({
  popUp: popUpNewPlaceContainer,
  func: (data) => {
    const name = data.cardName;
    const link = data.cardUrl;

    renderLoading(true, formNewPlace);

    api.postNewCard(name, link)
      .then(
        data => {
          section.renderItem(data);
          PopUpPlace.close();
        })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, formNewPlace, 'Создать')
      })
  }
});

const PopUpFormValidator = new FormValidator(validationObject, formProfile);
const PopUpAvatarValidator = new FormValidator(validationObject, formAvatar);
const PopUpPlaceValidator = new FormValidator(validationObject, formNewPlace);

function createCard(cardData) {
  const card = new Card(
    cardData,
    'element-template',
    userId,
    {
      handleLikeClick: (thisCard) => {
        if (!thisCard._likeButton.classList.contains("element__like_on")) {
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
        const popUpImage = new PopupWithImage(popUpImageContainer, cardUrl, cardName);
        popUpImage.open();
        popUpImage.setEventListeners();

      }
    }
  );
  return card;
}

// Установка слушателей на элементы
buttonOpenPopUpProfile.addEventListener('click', () => {
  const nameInput = popUpProfileContainer.querySelector('.form__item[name=name]');
  const aboutInput = popUpProfileContainer.querySelector('.form__item[name=about]');
  nameInput.value = document.querySelector('.profile__name').textContent;
  aboutInput.value = document.querySelector('.profile__text').textContent;
  PopupForm.open();
  PopUpFormValidator.enableValidation();
});

buttonOpenPopUpAvatar.addEventListener('click', () => {
  PopUpAvatar.open();
  PopUpAvatarValidator.enableValidation();
});

buttonOpenPopUpNewPlace.addEventListener('click', () => {
  PopUpPlace.open();
  PopUpPlaceValidator.enableValidation();
});

PopupForm.setEventListeners();
PopUpAvatar.setEventListeners();
PopUpPlace.setEventListeners();