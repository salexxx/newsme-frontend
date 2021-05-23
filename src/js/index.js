import '../css/style.css';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import ResultList from './components/ResultList';
import Popup from './components/Popup';
import Form from './components/Form';
import MainApi from './api/MainApi';
import isLoggedIn from './utils/isLoggedIn';
import Header from './components/Header';

let cardsArray = [];
const resultlist = new ResultList(document.querySelector('.result__articles'), cardsArray);

const authoriz = document.querySelector('.header__nav_button');
const popupAuthoriz = new Popup('authoriz');
const popupAuthen = new Popup('authen');
const popupSuccess = new Popup('success');
const toggletoAuthen = document.querySelector('.toggle-to-authen');
const toggletoAuthoriz = document.querySelector('.toggle-to-authoriz');
const successtoAuthorize = document.querySelector('.success-to-authoriz');
const formAuthen = new Form(document.querySelector('#registration'));
const formAuthoriz = new Form(document.querySelector('#authorization'));
const header = new Header('white', document.querySelector('.header__nav'));
const isLogged = isLoggedIn();

if (isLoggedIn()) {
  const name = localStorage.getItem('name');
  header.render({ isLogged: true, name });
} else {
  header.render({ isLogged: false, undefined });
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
authoriz.onclick = () => {
  if (!isLoggedIn()) {
    popupAuthoriz.open(); formAuthoriz.setEventListener();
  } else { header.logout(); }
};

// отправка формы регистрации
document.forms.registration.onsubmit = (e) => {
  e.preventDefault();
  api.signup(e.target.elements.email.value,
    e.target.elements.password.value,
    e.target.elements.name.value)
    .then((res) => {
      console.log(res.message);
      if (res.message) {
        popupAuthen.showMessage(res.message);
        return;
      }
      popupAuthen.close();
      popupSuccess.open();
    })
    .catch((err) => console.log(err));
};
// отправка формы авторизации
document.forms.authorization.onsubmit = (e) => {
  e.preventDefault();
  api.signin(e.target.elements.email.value, e.target.elements.password.value)
    .then((res) => {
      if (res.message) {
        popupAuthoriz.showMessage(res.message);
        return;
      }
      const { token, name, id } = res;
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('id', id);
      header.render({ isLogged: true, name });
      popupAuthoriz.close();
    })
    .catch((err) => console.log(err));
};

// отправка формы поиска новостей
document.forms.searchForm.onsubmit = (e) => {
  resultlist.renderLoader();
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
          isLogged,
          api,
        );
        return newscard.create();
      });
      resultlist.renderLoader();
      resultlist.renderResults(cardsArray);
    })
    .catch((err) => (new Error({ message: err })));
};
