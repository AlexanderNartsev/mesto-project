const form = document.querySelector('.form-container');

export const validationObject = {

  formSelector: '.form-container',
  inputSelector: '.form__item',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_condition_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'error_active'

}

// Показать ошибку
function showError(formEl, inputEl, errorText, object) {

  const inputError = formEl.querySelector(`.${inputEl.name}-error`);
  inputEl.classList.add(object.inputErrorClass);
  inputError.textContent = errorText;
  inputError.classList.add(object.errorClass);

}

// Скрыть ошибку
function hideError(formEl, inputEl, object) {

  const inputError = formEl.querySelector(`.${inputEl.name}-error`);
  inputEl.classList.remove(object.inputErrorClass);
  inputError.textContent = '';
  inputError.classList.remove(object.errorClass);

}

// Проверить данные в поле
export function isValid(formEl, inputEl, object) {

  if (!inputEl.validity.valid) {
    showError(formEl, inputEl, inputEl.validationMessage, object);
  }
  else {
    hideError(formEl, inputEl, object);
  }

}

// Проверить все поля формы
const hasInvalidInput = (inputList) => {

  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  })

};

// Отключение кнопки
export const toggleButtonState = (inputList, buttonElement, object) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }

};

function setEventListeners(formEl, object) {

  const inputList = Array.from(formEl.querySelectorAll(object.inputSelector));
  const buttonElement = formEl.querySelector(object.submitButtonSelector);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      isValid(formEl, inputEl, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });

}

export function enableValidation(object) {

  const formList = Array.from(document.querySelectorAll(object.formSelector));

  formList.forEach((formEl) => {
    formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, object);
  });

}

// Валидация при открытии формы
export function resetValidation(popUp, object) {
  const inputList = Array.from(popUp.querySelectorAll(object.inputSelector));
  const buttonElement = popUp.querySelector(object.submitButtonSelector);

  inputList.forEach((inputEl) => {
    if (inputEl.value) {
      isValid(popUp, inputEl, object);
    }
  })

  toggleButtonState(inputList, buttonElement, object);

}