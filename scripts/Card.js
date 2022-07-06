class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._placeList = document.querySelector(".cards__list");
  }

  _openModal(popupElement) {
    popupElement.classList.add("popup_opened");
  }


  _handleLikeButton = (evt) => {
    evt.target.classList.toggle("card__place-favorite_active");
  };

  _handleDeleteButton = () => {
    this.cardElement.remove();
    if (this._placeList.childNodes.length) {
      document
        .querySelector(".cards__no-places")
        .classList.remove("cards__no-places_active");
    } else {
      document
        .querySelector(".cards__no-places")
        .classList.add("cards__no-places_active");
    }
  };

  _setEventListeners() {
    this.cardElement
      .querySelector(".card__place-favorite")
      .addEventListener("click", this._handleLikeButton);

    const deleteButton = this.cardElement.querySelector(".card__trash");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this.cardElement);
    });

    this.cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._showPreviewImage();
      });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true); ///_getTemplate
  }

  getView() {
    this.cardElement = this._getTemplate();
    this.cardElement.querySelector(".card__place-name").textContent = this._name;
    const imageElement = this.cardElement.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._setEventListeners();
    return this.cardElement;
  }

  _showPreviewImage() {
    this._openModal(document.querySelector("#view__image"));
    const imageElement = document.querySelector(".popup__card-image-preview");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    document.querySelector(".popup__card-image-preview-name").textContent =
      this._name;
  }
}

export default Card;
