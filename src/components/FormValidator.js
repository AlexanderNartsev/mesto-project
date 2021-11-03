export class FormValidator {

  constructor(validationObject, formEl) {
    this.formSelector = validationObject.formSelector;
    this.inputSelector = validationObject.inputSelector;
    this.submitButtonSelector = validationObject.submitButtonSelector;
    this.inactiveButtonClass = validationObject.inactiveButtonClass;
    this.inputErrorClass = validationObject.inputErrorClass;
    this.errorClass = validationObject.errorClass;
  }

  _hideError(formEl, inputEl) {

    const inputError = formEl.querySelector(`.${inputEl.name}-error`);
    inputEl.classList.remove(this.inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(this.errorClass);

  }

  _showError(formEl, inputEl, errorText) {

    const inputError = formEl.querySelector(`.${inputEl.name}-error`);

    inputEl.classList.add(this.inputErrorClass);
    inputError.classList.add(this.errorClass);
    inputError.textContent = errorText;

  }

  _isValid(formEl, inputEl, object) {

    if (!inputEl.validity.valid) {
      this._showError(formEl, inputEl, inputEl.validationMessage, object);
    }
    else {
      this._hideError(formEl, inputEl, object);
    }

  }

  _hasInvalidInput(inputList) {

    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    })

  }

  _toggleButtonState(inputList, buttonElement, object) {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }

  }

  _setEventListeners(formEl) {

    const inputList = Array.from(formEl.querySelectorAll(this.inputSelector));
    const buttonElement = formEl.querySelector(this.submitButtonSelector);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._isValid(formEl, inputEl);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

  }

  resetValidation(formEl) {

    const inputList = Array.from(formEl.querySelectorAll(this.inputSelector));
    const buttonElement = formEl.querySelector(this.submitButtonSelector);

    inputList.forEach((inputEl) => {
      if (inputEl.value) {
        this._isValid(formEl, inputEl);
      }
    })

    this._toggleButtonState(inputList, buttonElement);

  }

  enableValidation(validationObject) {

    const formList = Array.from(document.querySelectorAll(this.formSelector));

    formList.forEach((formEl) => {
      formEl.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formEl, validationObject);
      this.resetValidation(formEl);
    });

  }

}