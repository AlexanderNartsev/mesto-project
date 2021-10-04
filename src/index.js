import './pages/index.css';
import { isValid, toggleButtonState } from './components/validate.js';

// Вся страница
export const page = document.querySelector('.page');

function setEventListeners(formEl) {

  const inputList = Array.from(formEl.querySelectorAll('.form__item'));
  const buttonElement = formEl.querySelector('.button_type_save');

  inputList.forEach((inputEl) => {

    inputEl.addEventListener('input', () => {

      isValid(formEl, inputEl);

      toggleButtonState(inputList, buttonElement);

    });

  });

};

function enableValidation() {

  const formList = Array.from(document.querySelectorAll('.form-container'));

  formList.forEach((formEl) => {

    formEl.addEventListener('submit', (evt) => {

      evt.preventDefault();

    });

    setEventListeners(formEl);

  });

};

enableValidation();