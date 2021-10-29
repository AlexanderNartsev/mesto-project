export class Popup {

  constructor(popUp) {

    this.popUp = popUp;
    this.page = document.querySelector('.page');

  }

  close() {

    this.page.removeEventListener('keydown', () => { this._handleEscClose() });
    this.popUp.removeEventListener('click', (evt) => { this._closeByOverlayOrButton(evt) });
    this.popUp.classList.remove('form-container_opened');

  };

  _handleEscClose(evt) {
    if (evt && evt.key === 'Escape') {
      this.close();
    };
  }

  _closeByOverlayOrButton(evt) {

    if (evt.target === evt.currentTarget || evt.target.parentElement.classList.contains('button_type_close')) {
      this.close();
    };

  }

  setEventListeners() {

    this.page.addEventListener('keydown', (evt) => { this._handleEscClose(evt) });
    this.popUp.addEventListener('click', (evt) => { this._closeByOverlayOrButton(evt) });

  }

  open() {

    this.popUp.classList.add('form-container_opened');
    this.setEventListeners();

  }

}