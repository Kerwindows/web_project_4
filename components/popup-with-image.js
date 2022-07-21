import Popup from "./popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(name,link) {    
    const imageElement = document.querySelector(".popup__card-image-preview");
    imageElement.src = link;
    imageElement.alt = name;
    document.querySelector(".popup__card-image-preview-name").textContent = name;
    super.open();
  }
}

export default PopupWithImage;
