export class Popup {

  constructor(popUp) {

    this._popUp = popUp;
    this._page = document.querySelector('.page');

  }

  close() {

    this._page.removeEventListener('keydown', this._handleEscClose);
    this._popUp.classList.remove('form-container_opened');

  };

  _handleEscClose = (evt) => {
    if (evt && evt.key === 'Escape') {
      this.close();
    };
  }

  _closeByOverlayOrButton = (evt) => {

    if (evt.target === evt.currentTarget || evt.target.parentElement.classList.contains('button_type_close')) {
      this.close();
    };

  }

  setEventListeners() {

    this._popUp.addEventListener('click', this._closeByOverlayOrButton);

  }

  open() {

    this._popUp.classList.add('form-container_opened');
    this._page.addEventListener('keydown', this._handleEscClose);

  }

}