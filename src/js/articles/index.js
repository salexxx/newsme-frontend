import '../../css/articles.css';
import isLoggedIn from '../utils/isLoggedIn';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import ResultList from '../components/ResultList';
import MainApi from '../api/MainApi';
import keywordCounter from '../utils/keywordCounter';

let cardsArray = [];
const resultlist = new ResultList(document.querySelector('.result__articles'), cardsArray);
const title = document.querySelector('.result__title_saved');
const isLogged = isLoggedIn();
const header = new Header('white', document.querySelector('.header__nav'));
if (isLoggedIn()) {
  const name = localStorage.getItem('name');
  header.render({ isLogged: true, name });
} else {
  document.location.href = '/index.html';
}

const openmenu = document.querySelector('.header__open');
const closemenu = document.querySelector('.header__close');

openmenu.addEventListener('click', () => header.open());
closemenu.addEventListener('click', () => header.close());

const api = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

function renderSubtitle(arr) {
  if (arr.length === 3) {
    document.querySelector('.result__subtitle_bold').textContent = `${arr[0]}, ${arr[1]}, ${arr[2]}`;
  } else if (arr.length === 2) {
    document.querySelector('.result__subtitle_bold').textContent = `${arr[0]}, ${arr[1]}`;
  } else if (arr.length === 1) {
    document.querySelector('.result__subtitle_bold').textContent = `${arr[0]}`;
  } else {
    document.querySelector('.result__subtitle_bold').textContent = `${arr[0]}, ${arr[1]}`;
    document.querySelector('.result__subtitle_bold-other').textContent = ` и ${arr.length - 2} другим`;
  }
}

api.getArticles()
  .then((res) => {
    const sorted = keywordCounter(res);
    console.log(sorted);
    if (sorted.length !== 0) renderSubtitle(sorted);
    cardsArray = res.data.map((elem) => {
      const newscard = new NewsCard(
        elem.keyword,
        elem.title,
        elem.text,
        elem.date,
        elem.link,
        elem.image,
        elem.source,
        isLogged,
        api,
        elem._id,
      );
      return newscard.create();
    });
    title.textContent = `${localStorage.getItem('name')}, у вас ${cardsArray.length} сохраненных статей`;
    resultlist.renderResults(cardsArray);
  });

/* document.addEventListener('click', (e) => {
  console.log(e.target, cardsArray);
}) */