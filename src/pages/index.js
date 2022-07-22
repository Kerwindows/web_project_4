import "./index.css";

import FormValidator from "../../components/form-validator.js";
import Card from "../../components/card.js";
import Section from "../../components/section.js";
import PopupWithImage from "../../components/popup-with-image.js";
import PopupWithForm from "../../components/popup-with-form.js";
import UserInfo from "../../components/UserInfo.js";

const editProfileOpenBtn = document.querySelector(".profile__edit-btn");
const profileNameInput = document.querySelector(".profile__edit-name");
const profileOccupationInput = document.querySelector(".profile__about-me");
const profileForm = document.querySelector("#edit__profile");
const editProfileCloseBtn = document.querySelector(".popup__edit-close-btn");
const popupProfileName = document.querySelector(".js-input-type-profile-name");
const popupProfileIconsTitle = document.querySelector(
  ".js-input-type-profile-about-me"
);
const submitProfileEdit = document.querySelector(".popup__edit-form");
/* -------------------------------- add place ------------------------------- */
const addPlaceForm = document.forms.addPlaceForm;
const popupAddPlaceForm = document.querySelector("#add-place-popup");
const addPlacesOpenBtn = document.querySelector(".profile__add-places-btn");
const addPlaceCloseBtn = document.querySelector(".popup__place-close-btn");
const popupPlaceName = document.querySelector(".js-input-type-place-name");
const popupPlaceUrl = document.querySelector(".js-input-type-place-url");
const submitNewPlace = document.querySelector(".popup__place-form");
/* ----------------------------- Generate Cards ----------------------------- */
const placeList = document.querySelector(".cards__list");
/* ------------------------------ image preview ----------------------------- */
const imagePopup = document.querySelector("#view__image");
const viewImageCloseBtn = document.querySelector(".popup__image-close-btn");

const addPopupSelector = "#add-place-popup";
const editPopupSelector = "#edit__profile";
const profileName = ".profile__edit-name";
const profileJob = ".profile__about-me";

const initialPlaces = [
  {
    name: "Tobago",
    link:
      "https://th.bing.com/th/id/OIP.AfQeN6j8IHA1QwQV1LAhMgHaE8?pid=ImgDet&rs=1"
  },
  {
    name: "Turks & Caicos",
    link:
      "https://th.bing.com/th/id/R.2256ea7e2645811623722e1984fa2cea?rik=Pul7OZw45sq3Ig&pid=ImgRaw&r=0"
  },
  {
    name: "Paris",
    link:
      "https://th.bing.com/th/id/R.9550f55006740bf41c970da21eee7bad?rik=6890JkFG%2f4Cs2w&pid=ImgRaw&r=0"
  },
  {
    name: "South Island, New Zealand",
    link:
      "https://th.bing.com/th/id/OIP.eda4bswSTGR8dkvPL382IgHaEt?pid=ImgDet&rs=1"
  },
  {
    name: "West Maui",
    link:
      "https://th.bing.com/th/id/OIP.H1kCOg0IQXbEx3p9k-DXkAHaE5?pid=ImgDet&rs=1"
  },
  {
    name: "Orlando, Florida",
    link:
      "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  }
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__error_visible"
};

/* --------------------------------- function for rendering card on load --------------------------------- */

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    () => {
      handleCardClick(cardData);
    },
    () => {
      if (document.querySelector(".cards__list").childNodes.length) {
        document
          .querySelector(".cards__no-places")
          .classList.remove("cards__no-places_active");
      } else {
        document
          .querySelector(".cards__no-places")
          .classList.add("cards__no-places_active");
      }
    }
  );
  return card.getView();
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();
  const name = popupPlaceName.value;
  const link = popupPlaceUrl.value;

  const newCardElement = createCard({ name, link });
  addNewCard.close();
  placesFormValidator.toggleButtonState();
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileNameInput.textContent = popupProfileName.value;
  profileOccupationInput.textContent = popupProfileIconsTitle.value;
  editFormPopup.close();
}

/*--------------------------------------------*/
const cardList = new Section(
  {
    items: initialPlaces,
    renderer: cardData => {
      cardList.addItem(createCard(cardData));
    }
  },
  placeList
);
cardList.renderItems();

const previewImagePopup = new PopupWithImage("#view__image");
previewImagePopup.setEventListeners();

const handleCardClick = item => {
  previewImagePopup.open(item.name, item.link);
};

/*------------------------------------------------------------------*/
const addNewCard = new PopupWithForm(addPopupSelector, {
  handleFormSubmit: data => {
    cardList.addItem(createCard(data));
  }
});
addNewCard.setEventListeners();

submitNewPlace.addEventListener("submit", submitAddPlaceForm);
addPlacesOpenBtn.addEventListener("click", () => {
  addNewCard.open();
});

/* --------------------------------- Profile Form --------------------------------- */

const newUserInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob
});

const editFormPopup = new PopupWithForm(editPopupSelector, {
  handleFormSubmit: data => {
    newUserInfo.setUserInfo(data);
    profileFormValidator.toggleButtonState();
  }
});
editFormPopup.setEventListeners();
// editProfileOpenBtn.addEventListener("click", () => {
//   // editFormPopup.open();
//   //editFormPopup.setInputValues(newUserInfo.getUserInfo());

//   
// });

editProfileOpenBtn.addEventListener("click", () => {
  editFormPopup.open();
});

submitProfileEdit.addEventListener("submit", submitEditProfileForm);


/* --------------------------------- Verification --------------------------------- */
const profileFormValidator = new FormValidator(
  validationConfig,
  submitProfileEdit
);
const placesFormValidator = new FormValidator(validationConfig, submitNewPlace);
placesFormValidator.enableValidation();
profileFormValidator.enableValidation();
