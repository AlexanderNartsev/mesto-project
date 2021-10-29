import { Popup } from "./Popup";

export class PopupWithImage extends Popup {

  constructor(popUp) {

    super(popUp);

  }

  open() {

    super.open();

    const imageUrl = event.target.getAttribute('src');
    const imageName = event.target.getAttribute('alt');

    this.popUp.querySelector('.image-popup__image').setAttribute('src', imageUrl);
    this.popUp.querySelector('.image-popup__image').setAttribute('alt', imageName);
    this.popUp.querySelector('.image-popup__name').textContent = imageName;

  }

}