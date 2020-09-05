export default class NewsApi {
  constructor(query) {
    const url = 'http://nomoreparties.co/news/v2/everything?'
           + `q=${query}&`
           + 'from=2020-08-30&'
           + 'sortBy=popularity&'
           + 'apiKey=1e2fe3565359499396b3dec8c265c2b3';
    this.req = new Request(url);
  }

  getNews() {
    return fetch(this.req)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
      });
  }
}
