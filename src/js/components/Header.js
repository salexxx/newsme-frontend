import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(theme) {
    super();
    this.theme = theme;
    this.menu = document.querySelector('.header__nav');
  }

  render(props) {
    const { isLogged, name } = props;
    if (isLogged) {
      this.menu.querySelector('.header__nav_button').firstChild.textContent = name;
      this.menu.querySelector('.header__nav_linkto').classList.remove('invisible');
      this.menu.querySelector('.header__nav_img').classList.remove('invisible');
    }
    if (!isLogged) {
      this.menu.querySelector('.header__nav_button').firstChild.textContent = 'Авторизоваться';
      this.menu.querySelector('.header__nav_linkto').classList.add('invisible');
      this.menu.querySelector('.header__nav_img').classList.add('invisible');
    }
  }

  open() {
    this.menu.style.visibility = 'visible';
  }

  close() {
    this.menu.style.visibility = 'hidden';
  }

  logout() {
    localStorage.removeItem('token');
    this.menu.querySelector('.header__nav_button').firstChild.textContent = 'Авторизоваться';
    this.menu.querySelector('.header__nav_linkto').classList.add('invisible');
    this.menu.querySelector('.header__nav_img').classList.add('invisible');
  }
}
