import '../css/style.css';
import NewsApi from './api/NewsApi';

const url = 'http://newsapi.org/v2/everything?'
          + 'q=Sport&'
          + 'from=2020-08-29&'
          + 'sortBy=popularity&'
          + 'apiKey=1e2fe3565359499396b3dec8c265c2b3';

const req = new Request(url);

const news = new NewsApi(req);
console.log(news.getNews());
