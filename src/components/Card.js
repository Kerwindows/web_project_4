class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteButton,
    handleLikeButton,
    userId
  ) {
    this.handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._cardSelector = cardSelector;
    this._handleLikeButton = handleLikeButton;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._userId = userId;
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  isLiked() {
    return this._likes.some(like => like._id === this._userId);
  }

  _renderLikes() {
    this._likesTotal.textContent = this._likes.length;
    if (this.isLiked()) {
      this._cardElement
        .querySelector(".card__place-favorite")
        .classList.add("card__place-favorite_active");
    } else {
      this._cardElement
        .querySelector(".card__place-favorite")
        .classList.remove("card__place-favorite_active");
    }
  }

  getCardId() {
    return this._id;
  }
  //runs 3rd
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__place-favorite")
      .addEventListener("click", this._handleLikeButton);

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteButton(this._cardElement);
    });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleCardClick({ link: this._link, name: this._name });
      });
  }

  removeCard() {
    this._cardElement.remove();
    return (this._cardElement = null);
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
    this._cardElement.querySelector(
      ".card__place-name"
    ).textContent = this._name;
    const imageElement = this._cardElement.querySelector(".card__image");
    this._likesTotal = this._cardElement.querySelector(".card__place-num");
    this._trashButton = this._cardElement.querySelector(".card__trash");
    this._setEventListeners();
    this._renderLikes();
    imageElement.src = this._link;
    imageElement.alt = this._name;
    if (this._ownerId !== this._userId) {
      this._trashButton.remove();
    }
    return this._cardElement;
  }
}

export default Card;
