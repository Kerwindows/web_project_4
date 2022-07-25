import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = document.querySelector(".popup__card-image-preview");
  }
  open(name, link) {
    const imageElement = this._cardImage;
    imageElement.src = link;
    imageElement.alt = name;
    document.querySelector(
      ".popup__card-image-preview-name"
    ).textContent = name;
    super.open();
  }
}

export default PopupWithImage;
