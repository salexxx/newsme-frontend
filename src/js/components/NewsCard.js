/* eslint-disable no-restricted-globals */
import dateFormater from '../utils/getDate';

export default class NewsCard {
  constructor(keyword, title, description, publishedAt,
    url, urlToImage, source, isLogged, createApi, id) {
    this.keyword = keyword;
    this.title = title;
    this.description = description;
    this.publishedAt = publishedAt;
    this.url = url;
    this.urlToImage = urlToImage;
    this.source = source;
    this.isLogged = isLogged;
    this._createApi = createApi;
    this._id = id;
  }

  create() {
    const article = document.querySelector('.article');
    article.content.querySelector('.article__image').src = this.urlToImage;
    article.content.querySelector('.article__date').textContent = dateFormater.dateFormater(this.publishedAt);
    article.content.querySelector('.article__title').textContent = this.title;
    article.content.querySelector('.article__title').setAttribute('href', this.url);
    article.content.querySelector('.article__text').textContent = this.description;
    article.content.querySelector('.article__source').textContent = this.source;
    article.content.querySelector('.article__tooltip_keyword').textContent = this.keyword;
    const clone = document.importNode(article.content, true);
    if (!this.isLogged) {
      clone.querySelector('.article__bookmark').classList.remove('article__bookmark_normal');
      clone.querySelector('.article__bookmark').classList.add('article__bookmark_notlogged');
      return clone;
    }
    clone.querySelector('.article__bookmark').addEventListener('click', this.handler.bind(this));
    return clone;
  }

  handler() {
    const api = this._createApi;
    if (event.target.classList.contains('article__bookmark_trash')) {
      event.target.parentNode.remove();
    }
    if (event.target.classList.contains('article__bookmark_marked') || event.target.classList.contains('article__bookmark_trash')) {
      api.deleteArticle(
        this._id,
      )
        .then(event.target.classList.remove('article__bookmark_marked'))
        .catch((err) => console.log(err));
      return;
    }
    api.addArticle(
      this.keyword,
      this.title,
      this.description,
      this.publishedAt,
      this.source,
      this.url,
      this.urlToImage,
      localStorage.getItem('id'),

    )
      .then((res) => {
        this._id = res.data._id;
      })
      .then(event.target.classList.add('article__bookmark_marked'))
      .catch((err) => console.log(err));
  }
}
