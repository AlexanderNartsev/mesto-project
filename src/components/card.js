export class Card {
  constructor(data, selector, profileId, functions) {
    this._cardImage = data.link;
    this._cardName = data.name;
    this._cardId = data._id;
    this._cardOwner = data.owner._id;
    this._likes = data.likes;
    this._selector = selector;
    this._functions = functions;
    this._profileId = profileId;
    this._handleLikeClick = functions.handleLikeClick;
    this._deleteCard = functions.deleteCard;
    this._openPopup = functions.openImagePopup;
    this._cardLikeCounter; // ?
    this._likeButton;
    this._deleteButton;
    this._placeImage;
    this._namePlace;
  }

  // Получить разметку карточки
  _getElement() {
    const cardElement = document
      .getElementById(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    this._cardLikeCounter = cardElement.querySelector('.element__like-counter');
    this._likeButton = cardElement.querySelector('.element__like');
    this._deleteButton = cardElement.querySelector('.element__delete');
    this._placeImage = cardElement.querySelector('.element__image');
    this._namePlace = cardElement.querySelector('.element__label');

    return cardElement;
  }

  // Установить слушатели событий
  _setEventListeners() {
    // Удаление карточки
    if (this._cardOwner === this._profileId) {
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard(this);
      });
    }
    // Лайк карточки
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    // Открытие изображения
    this._placeImage.addEventListener('click', () => {
      this._openPopup(this._cardImage, this._cardName);  
    });                                                      
  }

  // "Заполнение" карточки данными
  _renderCardInfo() {
    this._cardLikeCounter.textContent = this._likes.length;
    this._placeImage.setAttribute('src', this._cardImage);
    this._placeImage.setAttribute('alt', this._cardName);
    this._namePlace.textContent = this._cardName;
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
    if (this._cardOwner === this._profileId) {
      this._deleteButton.style.display = 'block';
    }
  }

  // Обновление отображения лайков карточки
  _updateLikeView() {
    this._cardLikeCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__like_on");
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
    this._renderCardInfo();
    this._setLikeActive();
    this._setDeleteButtonActive()

    return this._element;
  }
}