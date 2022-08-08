export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupOnRemoteClick = this._closePopupOnRemoteClick.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._popup.addEventListener("mousedown", this._closePopupOnRemoteClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("mousedown", this._closePopupOnRemoteClick);
  }

  _closePopupOnRemoteClick(evt) {
    if (evt.target.classList.contains("popup__overlay")) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popup
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => this.close());
  }
}
