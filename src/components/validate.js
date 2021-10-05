const form = document.querySelector('.form-container');

// Показать ошибку
function showError(formEl, inputEl, errorText) {

  const inputError = formEl.querySelector(`.${inputEl.name}-error`);

  inputEl.classList.add('form__item_type_error');

  inputError.textContent = errorText;

  inputError.classList.add('error_active');

};

// Скрыть ошибку
function hideError(formEl, inputEl) {

  const inputError = formEl.querySelector(`.${inputEl.name}-error`);

  inputEl.classList.remove('form__item_type_error');

  inputError.textContent = '';

  inputError.classList.remove('error_active');

};

// Проверить данные в поле
export function isValid(formEl, inputEl) {

  if (!inputEl.validity.valid) {

    showError(formEl, inputEl, inputEl.validationMessage);

  }
  else {

    hideError(formEl, inputEl);

  }

};

// Проверить все поля формы
const hasInvalidInput = (inputList) => {

  return inputList.some((inputEl) => {

    return !inputEl.validity.valid;

  })

};

// Отключение кнопки
export const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {

    buttonElement.classList.add('button_condition_inactive');
    buttonElement.setAttribute('disabled', 'disabled');

  } else {

    buttonElement.classList.remove('button_condition_inactive');
    buttonElement.removeAttribute('disabled', 'disabled');

  }

};

