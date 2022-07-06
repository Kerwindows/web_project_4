class Card {
    constructor(data, cardSelector) {
        this.name = data.name;
        this.link = data.link;
        this.data = data;
        this.cardSelector = cardSelector;
        this.placeList = document.querySelector(".cards__list");
    }

    setEventListeners() {
        this.cardElement
            .querySelector(".card__place-favorite")
            .addEventListener("click", this.handleLikeButton);

        const deleteButton = this.cardElement.querySelector(".card__trash");
        deleteButton.addEventListener("click", () => {
            handleDeleteButton(cardElement);
        });

        this.cardElement
            .querySelector(".card__image")
            .addEventListener("click", () => {
                this.showPreviewImage();
            });
    }

    openModal(popupElement) {
        popupElement.classList.add("popup_opened");
        //document.addEventListener("keydown", closeWithEsc);
        // popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
    }


    addCard(cardElement, container) {
        container.prepend(cardElement);
    }

    handleLikeButton = (evt) => {
        evt.target.classList.toggle("card__place-favorite_active");
    };

    getTemplate() {
        return document
            .querySelector(this.cardSelector)
            .content.firstElementChild.cloneNode(true); ///getTemplate
    }

    generateCardElement(card) {
        this.cardElement = this.getTemplate();
        this.cardElement.querySelector(".card__place-name").textContent = card.name;
        const imageElement = this.cardElement.querySelector(".card__image");
        imageElement.src = card.link;
        imageElement.alt = card.name;
        this.setEventListeners();
        return this.cardElement;
    }

    getView() {
        this.data.forEach((card) => {
            console.log(card);
            const cardElement = this.generateCardElement(card);
            this.addCard(cardElement, this.placeList);
        });
    }

    showPreviewImage() {
        this.openModal(document.querySelector("#view__image"));
        const imageElement = document.querySelector(".popup__card-image-preview");

        imageElement.src = this.link;
        imageElement.alt = this.name;
        document.querySelector(".popup__card-image-preview-name").textContent = this.name;
    }
}

export default Card;
