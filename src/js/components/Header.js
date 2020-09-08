import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor() {
    super();
    /* this.name = props.name;
    this.auth = props.auth; */
    this.button = document.querySelector('.header__nav_button');
    this.linktosaved = document.querySelector('.header__linktosaved');
    this.exit = document.querySelector('.header__nav_img');
    this.saved = document.querySelector('.header__nav_linktosaved');
  }

  render(props) {
    const { isLogged, name } = props;
    if (isLogged) {
      this.button.firstChild.textContent = name;
      this.saved.classList.remove('invisible');
      this.exit.classList.remove('invisible');
    }
    if (!isLogged) {
      this.button.firstChild.textContent = 'Авторизоваться';
      this.saved.classList.add('invisible');
      this.exit.classList.add('invisible');
    }
  }
}
