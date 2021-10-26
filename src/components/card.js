export class Card {
  constructor(data, selector, profileId, functions) {
    this._cardImage = data.link;
    this._cardName = data.name;
    this._cardId = data._id;
    this._likes = data.likes;
    this._selector = selector;
    this._functions = functions;
    this._profileId = profileId;
    this._handleLikeClick = functions.handleLikeClick();
    this._deleteCard = functions.deleteCard();
    this._cardLikeCounter; // ?
    this._likeButton;
    this._deleteButton;
    this._placeImage;
  }

  // Получить разметку карточки
  _getElement() {
  	const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    this._cardLikeCounter = cardElement.querySelector('.element__like-counter'); // Вынести в отдельную функцию?
    this._likeButton = cardElement.querySelector('.element__like');
    this._deleteButton = cardElement.querySelector('.element__delete');
    this._placeImage = cardElement.querySelector('.element__delete');

    return cardElement;
  }

  // Установить слушатели событий
  _setEventListeners() {
    // Удаление карточки
    if (this._cardId === this._profileId) {
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
    }
    // Лайк карточки
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    // Открытие изображения
    this._placeImage.addEventListener('click', openImage);// Связать с PopupWithImage.js
	}

  // Установить количество лайков при отрисовке карточки
  _setLikeCounter() {
    this._cardLikeCounter.textContent = this._likes.length;
  }

  // Активация кнопки лайка если карточка была лайкнута пользователем
  _setLikeActive() {
    this._likes.forEach(like => {
      if (like._id === this._profileId) {
        this._likeButton.classList.add("element__like_on");
      }
    })
  }

  // Отрисовка кнопки удаления если карточка была создана пользователем
  _setDeleteButtonActive() {
    if (this._cardId === this._profileId) {
      this._deleteButton.style.display = 'block';
    }
  }

  // Обновление отображения лайков карточки
  _updateLikeView() {
    card._cardLikeCounter.textContent = this._likes.length;
    card._likeButton.classList.toggle("element__like_on");
  }

  //Установить количество лайков карточки
  setLikesInfo(dataCard) {
    this._likes = dataCard.likes;
    this._updateLikeView();
  }

  // Удалить карточку
  deleteCardElement() {
    this._element.remove();
  }

  // Запуск процесса создания карточки
  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    this._setLikeCounter();
    this._setLikeActive();
    this._setDeleteButtonActive()

  	return this._element;
  }
}






// import { putLike, deleteOwnersCard, postNewCard, deleteLike } from "./api.js";
// import { openImage, page, formNewPlace, closePopUp, popUpNewPlaceContainer, renderLoading } from "./modal.js";
// import { profileId } from "../pages/index"

// export const cardsArea = page.querySelector('.elements');

// // Сформировать карточку (без добавления на страницу)
// export function createCard(cardData, profileId) {
//   const cardTemplate = page.querySelector('#element-template').content;
//   const card = cardTemplate.querySelector('.element').cloneNode(true);
//   const cardImage = card.querySelector('.element__image');
//   const cardLabel = card.querySelector('.element__label');
//   const cardLikeCounter = card.querySelector('.element__like-counter');
//   const cardId = cardData._id;

//   cardImage.setAttribute('src', cardData.link);
//   cardImage.setAttribute('alt', cardData.name);
//   cardLabel.textContent = cardData.name;


//   cardLikeCounter.textContent = cardData.likes.length;


//   // Добавить обработчик на лайк
//   const likeButton = card.querySelector('.element__like');

//   cardData.likes.forEach(el => {
//     if (el._id === profileId) {
//       likeButton.classList.add("element__like_on");
//     }
//   })

//   if (cardData.owner._id === profileId) {

//     // Добавить обработчик на удаление
//     const deleteButton = card.querySelector('.element__delete');

//     function deleteCard(event) {

//       deleteOwnersCard(cardId)
//         .then(() => {
//           const card = event.target.closest('.element');
//           card.remove()
//         })
//         .catch((err) => {
//           console.log(err);
//         });

//     }

//     deleteButton.style.display = 'block';
//     deleteButton.addEventListener('click', deleteCard);

//   }

//   // Добавить уже установленные лайки

//   function like() {

//     if (!likeButton.classList.contains("element__like_on")) {
//       putLike(cardId)
//         .then(() => {
//           cardLikeCounter.textContent++;
//           likeButton.classList.add("element__like_on");
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     }
//     else {
//       deleteLike(cardId)
//         .then(() => {
//           cardLikeCounter.textContent--;
//           likeButton.classList.remove("element__like_on");
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     }

//   }

//   likeButton.addEventListener('click', like);

//   // Добавить обработчик на открытие изображения
//   const placeImage = card.querySelector('.element__image');
//   placeImage.addEventListener('click', openImage);

//   // Вернуть сформированную карточку
//   return card;

// };



//Добавить карточку
export function addCard(cardData, cardsArea, profileId) {
  const card = createCard(cardData, profileId);
  cardsArea.prepend(card);
}

// Создать карточку вручную
export function createCardHandle(event) {

  // Отключить стандартное поведение
  event.preventDefault();
  // Определить значения полей формы
  const name = formNewPlace.querySelector('.form__item[name=name]').value;
  const link = formNewPlace.querySelector('.form__item[name=url]').value;

  const button = formNewPlace.querySelector('.button_type_save')
  renderLoading(true, button)

  postNewCard(name, link)

    .then(
      data => {
        addCard(data, cardsArea, profileId);
        closePopUp(popUpNewPlaceContainer);
        formNewPlace.reset();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button, 'Создать')
    })
}