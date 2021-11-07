export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    
    this._container = document.querySelector(selector);
  }

  //Метод отрисовки начального массива
  renderItems() {
    this._renderedItems = this._renderedItems.reverse();
    this._renderedItems.forEach(item => this._renderer(item));
  }

  //Метод отрисовки отдельного элемента
  renderItem(item) {
    this._renderer(item);
  }

  setItem(element) {
    this._container.prepend(element);
  }
}