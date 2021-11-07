import { Popup } from "./Popup";

export class PopupWithForm extends Popup {

  constructor({ popUp, func }) {

    super(popUp);

    this._form = popUp.querySelector('.form');
    this._inputs = popUp.querySelectorAll('.form__item');
    this._func = func;

  }

  _getInputValues() {

    this.inputValues = {};

    this._inputs.forEach(input => {
      this.inputValues[input.name] = input.value;
    });

    return this.inputValues;

  }

  close() {

    super.close();

    this._form.reset();

  };

  _submitForm = (evt) => {

    evt.preventDefault();
    this._getInputValues();
    this._func(this.inputValues);

  }

  setEventListeners() {

    super.setEventListeners();

    this._form.addEventListener('submit', this._submitForm);

  }

}