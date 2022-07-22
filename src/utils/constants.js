export const editProfileOpenBtn = document.querySelector(".profile__edit-btn");
export const profileNameInput = document.querySelector(".profile__edit-name");
export const profileOccupationInput = document.querySelector(
  ".profile__about-me"
);
export const popupProfileName = document.querySelector(
  ".js-input-type-profile-name"
);
export const popupProfileIconsTitle = document.querySelector(
  ".js-input-type-profile-about-me"
);
export const submitProfileEdit = document.querySelector(".popup__edit-form");
/* -------------------------------- add place ------------------------------- */
export const addPlacesOpenBtn = document.querySelector(
  ".profile__add-places-btn"
);
export const popupPlaceName = document.querySelector(
  ".js-input-type-place-name"
);
export const popupPlaceUrl = document.querySelector(".js-input-type-place-url");
export const submitNewPlace = document.querySelector(".popup__place-form");
/* ----------------------------- Generate Cards ----------------------------- */
export const placeList = document.querySelector(".cards__list");
/* ------------------------------ image preview ----------------------------- */

export const addPopupSelector = "#add-place-popup";
export const editPopupSelector = "#edit__profile";
export const profileName = ".profile__edit-name";
export const profileJob = ".profile__about-me";

export const initialPlaces = [
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

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__error_visible"
};
