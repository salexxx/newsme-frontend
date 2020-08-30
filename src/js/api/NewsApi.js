export default class NewsApi {
  constructor(req) {
    this.req = req;
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
