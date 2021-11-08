export class FormValidator {

  constructor(validationObject, formEl) {
    this._formSelector = validationObject.formSelector;
    this._inputSelector = validationObject.inputSelector;
    this._submitButtonSelector = validationObject.submitButtonSelector;
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._inputErrorClass = validationObject.inputErrorClass;
    this._errorClass = validationObject.errorClass;
    this._formEl = formEl;
  }

  _hideError(inputEl) {

    const inputError = this._formEl.querySelector(`.${inputEl.name}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(this._errorClass);

  }

  _showError(inputEl, errorText) {

    const inputError = this._formEl.querySelector(`.${inputEl.name}-error`);

    inputEl.classList.add(this._inputErrorClass);
    inputError.classList.add(this._errorClass);
    inputError.textContent = errorText;

  }

  _isValid(inputEl, object) {

    if (!inputEl.validity.valid) {
      this._showError(inputEl, inputEl.validationMessage, object);
    }
    else {
      this._hideError(inputEl, object);
    }

  }

  _hasInvalidInput(inputList) {

    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    })

  }

  _toggleButtonState(inputList, buttonElement) {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }

  }

  _setEventListeners() {

    const inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
    const buttonElement = this._formEl.querySelector(this._submitButtonSelector);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._isValid(inputEl);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

  }

  resetValidation() {

    const inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
    const buttonElement = this._formEl.querySelector(this._submitButtonSelector);

    inputList.forEach((inputEl) => {
      if (inputEl.value) {
        this._isValid(inputEl);
      }
    })

    this._toggleButtonState(inputList, buttonElement);

  }

  enableValidation() {

    this._setEventListeners();
    this.resetValidation();

  }

}