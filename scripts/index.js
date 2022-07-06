import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

/* ------------------------------ edit profile  ------------------------------ */
const editProfileOpenBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__edit-name");
const profileIconsTitle = document.querySelector(".profile__about-me");
const profileForm = document.querySelector("#edit__profile");
const editProfileCloseBtn = document.querySelector(".popup__edit-close-btn");
const popupProfileName = document.querySelector(".js-input-type-profile-name");
const popupProfileIconsTitle = document.querySelector(
  ".js-input-type-profile-about-me"
);
const submitProfileEdit = document.querySelector(".popup__edit-form");
/* -------------------------------- add place ------------------------------- */
const addPlaceForm = document.forms.addPlaceForm;
const popupAddPlaceForm = document.querySelector("#add__place");
const addPlacesOpenBtn = document.querySelector(".profile__add-places-btn");
const addPlaceCloseBtn = document.querySelector(".popup__place-close-btn");
const submitPlace = document.querySelector(".popup__place-form");
const popupPlaceName = document.querySelector(".js-input-type-place-name");
const popupPlaceUrl = document.querySelector(".js-input-type-place-url");
const submitNewPlace = document.querySelector(".popup__place-form");
const noPlaceFound = document.querySelector(".cards__no-places");
/* ----------------------------- Generate Cards ----------------------------- */
const placeList = document.querySelector(".cards__list");
const htmlCardsTemplate = document.querySelector("#card-template").content.firstElementChild;///getTemplate
/* ------------------------------ image preview ----------------------------- */
const imagePopup = document.querySelector("#view__image");
const imagePopupName = document.querySelector(
  ".popup__card-image-preview-name"
);
const viewImageCloseBtn = document.querySelector(".popup__image-close-btn");

/* --------------------------------- places --------------------------------- */
const initialPlaces = [{
    name: "Tobago",
    link: "https://th.bing.com/th/id/OIP.AfQeN6j8IHA1QwQV1LAhMgHaE8?pid=ImgDet&rs=1",
  },
  {
    name: "Turks & Caicos",
    link: "https://th.bing.com/th/id/R.2256ea7e2645811623722e1984fa2cea?rik=Pul7OZw45sq3Ig&pid=ImgRaw&r=0",
  },
  {
    name: "Paris",
    link: "https://th.bing.com/th/id/R.9550f55006740bf41c970da21eee7bad?rik=6890JkFG%2f4Cs2w&pid=ImgRaw&r=0",
  },
  {
    name: "South Island, New Zealand",
    link: "https://th.bing.com/th/id/OIP.eda4bswSTGR8dkvPL382IgHaEt?pid=ImgDet&rs=1",
  },
  {
    name: "West Maui",
    link: "https://th.bing.com/th/id/OIP.H1kCOg0IQXbEx3p9k-DXkAHaE5?pid=ImgDet&rs=1",
  },
  {
    name: "Orlando, Florida",
    link: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
];
/* --------------------------------- All popups --------------------------------- */
function openModal(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEsc);
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

function closeModal(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEsc);
  popupElement.removeEventListener("mousedown", closePopupOnRemoteClick);
}
function closeWithEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closeModal(openedPopup);
  }
}
function closePopupOnRemoteClick(evt) {
  if (evt.target.classList.contains("popup__overlay")) {
    closeModal(evt.currentTarget);
  }
}
/* --------------------------------- Popup images --------------------------------- */
/*function showPreviewImage({
  name,
  link
}) {
  
  const imageElement = document.querySelector(".popup__card-image-preview");
  imageElement.src = link;
  imageElement.alt = name;
  imagePopupName.textContent = name;
}*/


const showPreview = new Card(initialPlaces,imagePopup);
showPreview.showPreviewImage();
  

viewImageCloseBtn.addEventListener("click", () => closeModal(imagePopup));


/* --------------------------------- Cards --------------------------------- */
/*const handleLikeButton = (evt) => {
  evt.target.classList.toggle("card__place-favorite_active");
};

function generateCardElement(cardData) {
  const cardElement = htmlCardsTemplate.cloneNode(true);///getTemplate

  cardElement.querySelector(".card__place-name").textContent = cardData.name;
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  cardElement.querySelector(".card__place-favorite")
    .addEventListener("click", handleLikeButton);

  const deleteButton = cardElement.querySelector(".card__trash");
  deleteButton.addEventListener("click", () => {
    handleDeleteButton(cardElement);
  });

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    showPreviewImage(cardData);
  });
  return cardElement;
}

initialPlaces.forEach(function (cardData) {
  const cardElement = generateCardElement(cardData);
  addCard(cardElement, placeList);
});//stay



const handleDeleteButton = (cardElement) => {
  cardElement.remove();
  if (placeList.childNodes.length) {
    noPlaceFound.classList.remove("cards__no-places_active");
  } else {
    noPlaceFound.classList.add("cards__no-places_active");
  }
};//handleDelete()

*/


const showCards = new Card(initialPlaces,"#card-template");
showCards.getView();


/* --------------------------------- Places Form --------------------------------- */


function submitAddPlaceForm(evt) {
  evt.preventDefault();
  const name = popupPlaceName.value;
  const link = popupPlaceUrl.value;
  const cardElement = generateCardElement({
    name,
    link,
  });

  noPlaceFound.classList.remove("cards__no-places_active");
  addCard(cardElement, placeList);
  closeModal(popupAddPlaceForm);
  addPlaceForm.reset();
  const inputList = [...addPlaceForm.querySelectorAll(".popup__form-input")];
  const buttonElement = addPlaceForm.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement, validationConfig);
}

function addCard(cardElement, container) {
  container.prepend(cardElement);
}


submitNewPlace.addEventListener("submit", submitAddPlaceForm);
addPlacesOpenBtn.addEventListener("click", () => openModal(popupAddPlaceForm));
addPlaceCloseBtn.addEventListener("click", () => closeModal(popupAddPlaceForm));

/* --------------------------------- Profile Form --------------------------------- */
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileIconsTitle.textContent = popupProfileIconsTitle.value;
  closeModal(profileForm);
}


editProfileOpenBtn.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileForm);
});


const fillProfileForm = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileIconsTitle.value = profileIconsTitle.textContent;
};

editProfileCloseBtn.addEventListener("click", () => closeModal(profileForm));
submitProfileEdit.addEventListener("submit", submitEditProfileForm);


/* --------------------------------- Verification --------------------------------- */
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-type-error",
    errorClass: "popup__error_visible",
};
 
const submitProfileEditValidator = new FormValidator(validationConfig,submitProfileEdit);
const submitNewPlaceValidator = new FormValidator(validationConfig,submitNewPlace);
submitProfileEditValidator.enableValidation();
submitNewPlaceValidator.enableValidation();


