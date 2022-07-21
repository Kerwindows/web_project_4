//form elements
const editFormElement = document.querySelector(".form");

//profile elements
const editButton = document.querySelector(".profile__info-button");
const profileName = ".profile__info-title";
const profileJob = ".profile__info-subtitle";
const profilePicture = ".profile__avatar-image";
const editAvatarButton = document.querySelector(".profile__avatar-overlay-image");

//popup elements
const editPopup = "#edit_popup";
const postPopup = "#popup_post";
const deletePopup = "#delete_post";

//avatar elements
const avatarPopup = "#avatar_popup";
const avatarForm = document.querySelector("#avatar_form");

//post elements
const postButton = document.querySelector(".profile__button");
const cardListSelector = ".elements";
const postFormElement = document.querySelector("#form_post");

//preview post elements
const preview = ".popup_type_preview";

const initialPlaces = [
    {
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

  const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-type-error",
    errorClass: "popup__error_visible",
  };
  


  export { 
    editFormElement, editButton, profileName,
    profileJob, editPopup, postPopup, postButton, 
    cardListSelector, postFormElement, preview, initialCards, validationSettings,
    profilePicture, deletePopup, avatarPopup, editAvatarButton, avatarForm
};