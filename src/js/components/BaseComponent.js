export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  // eslint-disable-next-line class-methods-use-this
  _addListener(element, event, callback) {
    element.addEventListener(event, callback);
  }

  _setListeners(listeners) {
    listeners.forEach((listener) => {
      this._addListener(...listener);
    });
  }

  _clearListeners() {
    this._listeners.forEach((listener) => {
      const { element, event, callback } = listener;
      element.removeEventListener(event, callback);
    });
  }
}
