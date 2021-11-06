import { Popup } from "./Popup";

export class PopupWithImage extends Popup {

  constructor(popUp, cardUrl, cardName) {

    super(popUp);

    this._cardUrl = cardUrl;
    this._cardName = cardName;

  }

  open() {

    super.open();

    this._popUp.querySelector('.image-popup__image').setAttribute('src', this._cardUrl);
    this._popUp.querySelector('.image-popup__image').setAttribute('alt', this._cardName);
    this._popUp.querySelector('.image-popup__name').textContent = this._cardName;

  }

  close() {

    super.close();

    this._popUp.removeEventListener('click', this._closeByOverlayOrButton);

  }

}