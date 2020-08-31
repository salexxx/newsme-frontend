import '../css/style.css';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import ResultList from './components/ResultList';
import Popup from './components/Popup';

// const searchButton = document.querySelector('.search__button');
let cardsArray = [];
const cardlist = new ResultList(document.querySelector('.result__articles'), cardsArray);

const mobilemenu = document.querySelector('.popupmenu__icon');
const popupMenu = new Popup('mobilemenu');
mobilemenu.addEventListener('click', () => {popupMenu.open();});

const authoriz = document.querySelector('.header__nav_button');
const popupAuthoriz = new Popup('authoriz');
authoriz.addEventListener('click', () => {
  popupAuthoriz.open();

});


document.forms.searchForm.onsubmit = (e) => {
  e.preventDefault();
  cardlist.renderLoader();
  const news = new NewsApi(e.target.elements.input.value);
  news.getNews()
    .then((res) => {
      cardsArray = res.articles.map((elem) => {
        const newscard = new NewsCard(
          elem.title,
          elem.description,
          elem.publishedAt,
          elem.url,
          elem.urlToImage,
          elem.source.name,
        );
        return newscard.create();
      });
      cardlist.renderLoader();
      cardlist.renderResults(cardsArray);
    });
};
