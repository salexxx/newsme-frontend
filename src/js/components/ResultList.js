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
    document.querySelector('.result__zero').classList.add('invisible');
    cardsArray.forEach((elem) => {
      this.addCard(elem);
    });
    if (cardsArray.length === 0) {
      this._renderNotFound();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoader() {
    document.querySelector('.result__preloader').classList.toggle('invisible');
  }

  // eslint-disable-next-line class-methods-use-this
  _renderNotFound() {
    document.querySelector('.result__zero').classList.remove('invisible');
  }
}
