import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor() {
    super();
    this.isAuthoriz = false; //isAuthoriz;
    // this.name = name;
    this.button = document.querySelector('.header__nax_button');
    this.linktosaved = document.querySelector('.header__linktosaved');
  }
  
/*   if (this.isAuthoriz) {
    this.linktosaved.setAttribute('display', 'none');

  } */

  setName(name) {
    this.button.textContent = name;
  }
}
