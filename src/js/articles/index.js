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

const header = new Header('white', document.querySelector('.header__nav'));
if (isLoggedIn()) {
  const name = localStorage.getItem('name');
  header.render({ isLogged: true, name });
} else {
  header.render({ isLogged: false, undefined });
}
const api = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

api.getArticles()
  .then((res) => {
    const sorted = keywordCounter(res);
    document.querySelector('.result__subtitle_bold').textContent = `${sorted[0]}, ${sorted[1]}`;
    document.querySelector('.result-section_subtitle-bold').textContent = `${sorted.length - 2} другим`;
   // console.log(keywordCounter(res));
    cardsArray = res.data.map((elem) => {
      const newscard = new NewsCard(
        elem.keyword,
        elem.title,
        elem.text,
        elem.date,
        elem.link,
        elem.image,
        elem.source,
      );
      return newscard.create();
    });
    title.textContent = `${localStorage.getItem('name')}, у вас ${cardsArray.length} сохраненных статей`;
    resultlist.renderResults(cardsArray);
  });
