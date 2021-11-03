import { Popup } from "./Popup";

export class PopupWithForm extends Popup {

  constructor({ popUp, func }) {

    super(popUp);

    this.form = popUp.querySelector('.form');
    this.inputs = popUp.querySelectorAll('.form__item');
    this.func = func;

  }

  _getInputValues() {

    this.inputValues = {};

    this.inputs.forEach(input => {
      this.inputValues[input.name] = input.value;
    });

    return this.inputValues;

  }

  close() {

    super.close();

    this.form.removeEventListener('submit', this._submitForm);

  };

  _submitForm = (evt) => {

    evt.preventDefault();
    this._getInputValues();
    this.func(this.inputValues);
    this.form.reset();
    this.close();

  }

  setEventListeners() {

    super.setEventListeners();

    this.form.addEventListener('submit', this._submitForm);

  }

}