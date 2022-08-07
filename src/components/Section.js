export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(cardsData) {
    this._items.forEach(cardsData => {
      this._renderer(cardsData);
    });
  }
}
