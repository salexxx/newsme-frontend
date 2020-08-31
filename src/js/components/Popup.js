export default class Popup {
  constructor(contentId) {
    this.elem = document.querySelector(`#${contentId}`);
  }

  open() {
    this.elem.style = '';
  }

  close() {
    this.elem.style = 'display: none';
  }
  setContent() {

  }
  clearContent() {

  }
}
