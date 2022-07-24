

class Card {
  constructor(data, cardSelector, handleCardClick ,onCardRemoved) {
    this.handleCardClick = handleCardClick;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._onCardRemoved = onCardRemoved;
  }

  _handleLikeButton = (evt) => {
    evt.target.classList.toggle("card__place-favorite_active");
  };

  _handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
    this._onCardRemoved();
  };
//runs 3rd
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__place-favorite")
      .addEventListener("click", this._handleLikeButton);

    this._cardElement.querySelector(".card__trash")
    .addEventListener("click", () => {
      this._handleDeleteButton(this._cardElement);
    });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleCardClick({ link:this._link, name:this._name});
      });
  }
//runs 2nd
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true); ///_getTemplate
  }
//runs 1st
  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__place-name").textContent = this._name;
    const imageElement = this._cardElement.querySelector(".card__image");
    
    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

}

export default Card;
