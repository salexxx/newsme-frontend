export default class Form {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector('button');
    this.inputs = this.form.querySelectorAll('input');
  }

  setEventListener() {
    const inputElements = Array.from(this.inputs);
    console.log(inputElements);
    // debugger;
    this.form.addEventListener('input', () => {
      if (inputElements.every((input) => this.checkInputValidity(input))) {
        this.button.removeAttribute('disabled', true);
      } else this.button.setAttribute('disabled', true);
    });
   /*  if (!inputElements.every((input) => this.checkInputValidity(input))) {
      this.button.setAttribute('disabled', true);
    } */
  }

  /*  setSubmitButtonState(input) {
    if (!this.checkInputValidity(input)) {
      this.button.setAttribute('disabled', true);
      return false;
    }
    this.button.removeAttribute('disabled', true);
    return true;
  } */

  checkInputValidity(input) {
    const errElem = input.nextElementSibling;
    const errorMessages = {
      valueMissing: 'Это обязательное поле',
      tooShort: 'Должно быть от 2 до 30 символов',
      typeMismatch: 'Неправильный формат Email',
    };
    if (input.value === '') { return false; }
    if (!input.checkValidity()) {
      if (input.validity.valueMissing) {
        errElem.textContent = errorMessages.valueMissing;
        return false;
      }
      if (input.validity.tooShort) {
        errElem.textContent = errorMessages.tooShort;
        return false;
      }
      if (input.validity.typeMismatch) {
        errElem.textContent = errorMessages.typeMismatch;
        return false;
      }
    }
    errElem.textContent = '';
    return true;
  }
}