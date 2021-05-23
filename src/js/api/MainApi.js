/* eslint-disable class-methods-use-this */
export default class MainApi {
  constructor(options) {
    this.options = options;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.resolve(res.json());
    }
    return res.json();
  }

  signup(email, password, name) {
    return fetch(`${this.options.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  signin(email, password) {
    return fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  getArticles() {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        authorization: this.options.headers.authorization,
      },
    })
      .then((res) => this._getResponseData(res));
  }

  addArticle(keyword, title, text, date, source, link, image, owner) {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        authorization: this.options.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        owner,
      }),

    })
      .then((res) => this._getResponseData(res));
  }

  deleteArticle(url) {
    return fetch(`${this.options.baseUrl}/articles/${url}`, {
      method: 'DELETE',
      headers: {
        authorization: this.options.headers.authorization,
      },
    })
      .then((res) => this._getResponseData(res));
  }

  getUser() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: this.options.headers.authorization,
      },
    })
      .then((res) => this._getResponseData(res));
  }
}
