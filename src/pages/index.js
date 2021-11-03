import { popUpImageContainer, cardListSection, userNameSelector, userActivitySelector, validationObject, buttonOpenPopUpProfile, buttonOpenPopUpNewPlace, popUpProfileContainer, popUpNewPlaceContainer, buttonOpenPopUpAvatar, popUpAvatarContainer, formProfile, formNewPlace, formAvatar } from '../components/utils/constants.js';
import Section from '../components/Section.js';
import { Card } from '../components/Card';
import { api } from '../components/Api';
import { UserInfo } from '../components/UserInfo';
import { FormValidator } from '../components/FormValidator.js';
import './index.css';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage} from '../components/PopupWithImage.js';

let userId;

Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then((values) => {
    // Обработка карточек
    const cardsList = new Section({
      items: values[1],
      renderer: (item) => {
        userId = values[0]._id;
        const card = createCard(item);

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
      { userNameSelector, userActivitySelector },
      () => api.getProfileInfo()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        }),
      (name, about) => api.patchProfileInfo(name, about)
        .catch((err) => {
          console.log(err);
        })
      //   .finally(() => {
      //     renderLoading(false, button, 'Сохранить');
      // })
    );

    userInfo.renderUserInfo();
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

// Установка слушателей на элементы
buttonOpenPopUpProfile.addEventListener('click', () => {

  const nameInput = popUpProfileContainer.querySelector('.form__item[name=name]');
  const aboutInput = popUpProfileContainer.querySelector('.form__item[name=about]');

  nameInput.value = document.querySelector('.profile__name').textContent;
  aboutInput.value = document.querySelector('.profile__text').textContent;

  new PopupWithForm({
    popUp: popUpProfileContainer,
    func: (data) => {
      const name = data.name;
      const about = data.about;

      renderLoading(true, formProfile);

      api.patchProfileInfo(name, about)
        .then(() => {
          document.querySelector('.profile__name').textContent = name;
          document.querySelector('.profile__text').textContent = about;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(false, formProfile, 'Сохранить');
        })
    }
  }).open();
  new FormValidator(validationObject).resetValidation(formProfile);
});

buttonOpenPopUpAvatar.addEventListener('click', () => {
  new PopupWithForm({
    popUp: popUpAvatarContainer,
    func: (data) => {
      const url = data.url;

      renderLoading(true, formAvatar);

      api.patchAvatar(url)
        .then(() => {
          // Присвоить введённые значения на форме полям профиля
          document.querySelector('.profile__avatar').setAttribute('src', url);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(false, formAvatar, 'Сохранить');
        })
    }
  }).open();
  new FormValidator(validationObject).resetValidation(formAvatar);
});

buttonOpenPopUpNewPlace.addEventListener('click', () => {
  new PopupWithForm({
    popUp: popUpNewPlaceContainer,
    func: (data) => {
      const name = data.cardName;
      const link = data.cardUrl;

      renderLoading(true, formNewPlace);

      api.postNewCard(name, link)
        .then(
          data => {
            const newCard = new Section({
              items: data,
              renderer: (item) => {
                const card = createCard(item);

                const cardElement = card.generate();
                newCard.setItem(cardElement);
              },
            },
              cardListSection
            );
            newCard.renderItems();
          })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(false, formNewPlace, 'Создать')
        })
    }
  }).open();
  new FormValidator(validationObject).resetValidation(formNewPlace);
});

new FormValidator(validationObject).enableValidation();

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
        new PopupWithImage(popUpImageContainer).open(cardUrl, cardName);
      }
    }
  );
  return card;
}