import '../css/style.css';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import ResultList from './components/ResultList';
import Popup from './components/Popup';
import Form from './components/Form';
import MainApi from './api/MainApi';
import isLoggetIn from './utils/isLoggedIn';
import Header from './components/Header';

let cardsArray = [];
const cardlist = new ResultList(document.querySelector('.result__articles'), cardsArray);

const authoriz = document.querySelector('.header__nav_button');
const popupAuthoriz = new Popup('authoriz');
const popupAuthen = new Popup('authen');
const popupSuccess = new Popup('success');
const toggletoAuthen = document.querySelector('.toggle-to-authen');
const toggletoAuthoriz = document.querySelector('.toggle-to-authoriz');
const successtoAuthorize = document.querySelector('.success-to-authoriz');
const formAuthen = new Form(document.querySelector('#registration'));
const formAuthoriz = new Form(document.querySelector('#authorization'));
const header = new Header();
const api = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
console.log(isLoggetIn());
if (isLoggetIn()) {
  const name = localStorage.getItem('name');
  header.render({ isLogged: true, name });
} else {
  header.render({ isLogged: false, undefined });
}

// навигация между popups
toggletoAuthen.onclick = () => {
  popupAuthoriz.close();
  popupAuthen.open();
  formAuthen.setEventListener();
};
toggletoAuthoriz.onclick = () => {
  popupAuthen.close();
  popupAuthoriz.open();
};
successtoAuthorize.onclick = () => {
  popupSuccess.close();
  popupAuthoriz.open();
};
//
// слушатель кнопки авторизации
authoriz.addEventListener('click', () => {
  popupAuthoriz.open();
  formAuthoriz.setEventListener();
});

// отправка формы регистрации
document.forms.registration.onsubmit = (e) => {
  e.preventDefault();
  api.signup(e.target.elements.email.value,
    e.target.elements.password.value,
    e.target.elements.name.value)
    .then((res) => {
      console.log(res);
      popupAuthen.close();
      popupSuccess.open();
    })
    .catch((err) => console.log(err.message));
};
// отправка формы авторизации
document.forms.authorization.onsubmit = (e) => {
  e.preventDefault();
  api.signin(e.target.elements.email.value, e.target.elements.password.value)
    .then((res) => {
      const { token, name } = res;
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      console.log(res);
      header.render({ isLogged: true, name });
      popupAuthoriz.close();
    })
    .catch((err) => console.log({ message: err }));
};

// отправка формы поиска новостей
document.forms.searchForm.onsubmit = (e) => {
  cardlist.renderLoader();
  e.preventDefault();
  const news = new NewsApi(e.target.elements.input.value);
  news.getNews()
    .then((res) => {
      const keyword = e.target.elements.input.value;
      cardsArray = res.articles.map((elem) => {
        const newscard = new NewsCard(
          keyword,
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
    })
    .catch((err) => (new Error({ message: err })));
};
