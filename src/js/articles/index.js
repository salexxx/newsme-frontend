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
const openmenu = document.querySelector('.header__open');
const closemenu = document.querySelector('.header__close');
const authoriz = document.querySelector('.header__nav_button');

authoriz.onclick = () => {
  header.logout();
  document.location.href = '/index.html';
};

openmenu.addEventListener('click', () => {
  header.open();
  // вся шляпа что не стал делать отдельное меню для мобильных устройств
  document.querySelector('.header__logo').classList.remove('header__logo_black');
  document.querySelector('.header__nav_link').classList.remove('header__nav_black');
  document.querySelector('.header__nav_linkto').classList.remove('header__nav_black');
  document.querySelector('.header__nav_linkto').classList.remove('header__nav_active-black');
  document.querySelector('.header__nav_button').classList.remove('header__nav_black');
  document.querySelector('.header__nav_img').setAttribute('src', '../images/exit-white.png');
});
closemenu.addEventListener('click', () => {
  header.close();
  document.querySelector('.header__logo').classList.add('header__logo_black');
  document.querySelector('.header__nav_link').classList.add('header__nav_black');
  document.querySelector('.header__nav_linkto').classList.add('header__nav_black');
  document.querySelector('.header__nav_linkto').classList.add('header__nav_active-black');
  document.querySelector('.header__nav_button').classList.add('header__nav_black');
  document.querySelector('.header__nav_img').setAttribute('src', '../images/exit.png');
});

if (isLoggedIn()) {
  const name = localStorage.getItem('name');
  header.render({ isLogged: true, name });
} else {
  document.location.href = '/index.html';
}

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
