export default class Popup {
  constructor(contentId) {
    this.content = document.querySelector(`#${contentId}`);
    this.popup = document.querySelector('.popup');
    this.closebtn = document.querySelector('.popup__close');
    this.closebtn.addEventListener('click', this.close.bind(this));
  }

  close() {
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
