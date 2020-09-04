export default class ResultList {
  constructor(container, cardsArray) {
    this.container = container;
    this.cardsArray = cardsArray;
  }

  addCard(cardElement) {
    this.container.appendChild(cardElement);
    this.cardsArray.push(cardElement);
  }

  renderResults(cardsArray) {
    if (cardsArray.length === 0) {
      this._renderNotFound();
      document.querySelector('.result__title').classList.add('result__title_invisible');
      document.querySelector('.result__articles').classList.add('result__articles_invisible');
      document.querySelector('.result__button').classList.add('result__button_invisible');
      return; // document.querySelector('.result__zero').classList.add('invisible');
    }
    document.querySelector('.result__title').classList.remove('result__title_invisible');
    document.querySelector('.result__articles').classList.remove('result__articles_invisible');
    document.querySelector('.result__button').classList.remove('result__button_invisible');
    document.querySelector('.result__zero').classList.add('invisible');
    // this._renderNotFound();
    this._clearResults();
    cardsArray.forEach((elem) => {
      this.addCard(elem);
    });
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
