export default class ResultList {
  constructor(container, cardsArray) {
    this.container = container;
    this.cardsArray = cardsArray;
    this.button = document.querySelector('.result__button');
    this.button.addEventListener('click', () => this._renderThree());
  }

  addCard(cardElement) {
    this.container.appendChild(cardElement);
  }

  renderResults(cardsArray) {
    this.cardsArray = cardsArray;
    if (cardsArray.length === 0) {
      this._renderNotFound();
      document.querySelector('.result__title').classList.add('result__title_invisible');
      document.querySelector('.result__articles').classList.add('result__articles_invisible');
      document.querySelector('.result__button').classList.add('result__button_invisible');
      return;
    }
    document.querySelector('.result__title').classList.remove('result__title_invisible');
    document.querySelector('.result__articles').classList.remove('result__articles_invisible');
    document.querySelector('.result__button').classList.remove('result__button_invisible');
    document.querySelector('.result__zero').classList.add('invisible');
    this._clearResults();

    this._renderThree();
  }

  _renderThree() {
    const arr = this.cardsArray.splice(0, 3);
    arr.forEach((elem) => {
      this.addCard(elem);
    });
    this._scroll();
    if (this.cardsArray.length === 0) {
      this.button.classList.add('result__button_invisible');
    }
  }

  _scroll() {
    this.button = document.querySelector('.result__button');
    this.button.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  _clearResults() {
    while (this.container.lastChild) {
      this.container.removeChild(this.container.lastChild);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoader() {
    this.container.parentElement.querySelector('.result__preloader').classList.toggle('invisible');
  }

  // eslint-disable-next-line class-methods-use-this
  _renderNotFound() {
    document.querySelector('.result__zero').classList.remove('invisible');
  }
}
