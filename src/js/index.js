import '../css/style.css';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import ResultList from './components/ResultList';

let cardsArray = [];
const cardlist = new ResultList(document.querySelector('.result__articles'), cardsArray);

const url = 'http://newsapi.org/v2/everything?'
          + 'q=Sport&'
          + 'from=2020-08-29&'
          + 'sortBy=popularity&'
          + 'apiKey=1e2fe3565359499396b3dec8c265c2b3';

const req = new Request(url);

const news = new NewsApi(req);
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
    cardlist.render(cardsArray);
    console.log(cardsArray);
  });
