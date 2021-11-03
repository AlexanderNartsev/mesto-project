import { Popup } from "./Popup";

export class PopupWithImage extends Popup {

  constructor(popUp) {

    super(popUp);

  }

  open(cardUrl, cardName) {

    super.open();

    this.popUp.querySelector('.image-popup__image').setAttribute('src', cardUrl);
    this.popUp.querySelector('.image-popup__image').setAttribute('alt', cardName);
    this.popUp.querySelector('.image-popup__name').textContent = cardName;

  }

}