class Card {
  constructor(
    data, 
    cardSelector, 
    handleCardClick,
    onCardRemoved,
    handleDeleteButton
    ) {
    this.handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._onCardRemoved = onCardRemoved;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = data.userId;
    this._id = data._id;
  }

  _handleLikeButton = (evt) => {
    evt.target.classList.toggle("card__place-favorite_active");

  };

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _renderLikes() {
    this._likesTotal.textContent = this._likes.length;
    if (this.isLiked()) {
      evt.target.classList.toggle("card__place-favorite_active");
    }
  }


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
    this._likesTotal = this._cardElement.querySelector(".card__place-num");
    this._renderLikes();
    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
