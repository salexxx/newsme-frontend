export default class Popup {
  constructor(contentId) {
    this.content = document.querySelector(`#${contentId}`);
    this.form = this.content.querySelector('.popup__form');
    this.popup = document.querySelector('.popup');
    this.closebtn = this.content.querySelector('.popup__close');
    this.closebtn.addEventListener('click', this.close.bind(this));
  }

  close() {
    this.form.reset();
    this._clearContent();
    this.popup.classList.remove('popup_is-opened');
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    this._setContent();
  }

  _setContent() {
    this.content.classList.add('popup__content_is-opened');
  }

  _clearContent() {
    this.content.classList.remove('popup__content_is-opened');
  }
}
