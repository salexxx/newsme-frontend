import dateFormater from '../utils/getDate';

export default class NewsCard {
  constructor(keyword, title, description, publishedAt, url, urlToImage, source) {
    this.title = title;
    this.description = description;
    this.publishedAt = publishedAt;
    this.url = url;
    this.urlToImage = urlToImage;
    this.source = source;
    /*     this.api = api;
 */ /* this.remove = this.remove.bind(this);
    this.like = this.like.bind(this); */
  }

  create() {
    const article = document.querySelector('.article');
    article.content.querySelector('.article__image').src = this.urlToImage;
    article.content.querySelector('.article__date').textContent = dateFormater.dateFormater(this.publishedAt);
    article.content.querySelector('.article__title').textContent = this.title;
    article.content.querySelector('.article__title').setAttribute('href', this.url);
    article.content.querySelector('.article__text').textContent = this.description;
    article.content.querySelector('.article__source').textContent = this.source;

    return document.importNode(article.content, true);
  }
/*     setEventListener(){
        this
        .placeCardElement
        .querySelector('.place-card__like-icon')
        .addEventListener('click', this.like);

        if (this.elemownerId === this.userId){
        this
        .placeCardElement
        .querySelector('.place-card__delete-icon')
        .style
        .display = 'block';
        this
        .placeCardElement
        .querySelector('.place-card__delete-icon')
        .addEventListener('click', this.remove);
        }
    }

    like(event){
        event.target.classList.toggle('place-card__like-icon_liked');
    }

  remove(event){
    if(window.confirm('Вы действительно хотите удалить карточку?')){
    this.api.deleteCard(this.elemId);
    this.placeCardElement.querySelector('.place-card__like-icon')
    .removeEventListener("click", this.like);
    event.target.removeEventListener("click", this.remove);
    event.target.closest('.place-card').remove();
    }
 } */
}
