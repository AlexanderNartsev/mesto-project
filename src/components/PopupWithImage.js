import { Popup } from "./Popup";

export class PopupWithImage extends Popup {

  constructor(popUp) {

    super(popUp);

  }

  open(cardUrl, cardName) {

    super.open();

    this._popUp.querySelector('.image-popup__image').setAttribute('src', cardUrl);
    this._popUp.querySelector('.image-popup__image').setAttribute('alt', cardName);
    this._popUp.querySelector('.image-popup__name').textContent = cardName;

  }

  close() {

    super.close();

    this._popUp.removeEventListener('click', this._closeByOverlayOrButton);

  }

}