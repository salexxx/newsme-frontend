import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(isAuthoriz, button) {
    super();
    this.isAuthoriz = isAuthoriz;
    this.button = button;
  }
}
