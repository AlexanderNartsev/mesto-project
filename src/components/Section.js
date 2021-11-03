export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    
    this._container = document.querySelector(selector);
  }

  renderItems() {
    if (Array.isArray(this._renderedItems)) {
      this._renderedItems = this._renderedItems.reverse();
      this._renderedItems.forEach(item => this._renderer(item));
    } else {
      this._renderer(this._renderedItems)
    }
  }

  setItem(element) {
    this._container.prepend(element);
  }
}