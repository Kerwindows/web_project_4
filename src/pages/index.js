import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialPlaces,
  placeList,
  addPopupSelector,
  editProfileOpenBtn,
  profileNameInput,
  profileOccupationInput,
  popupProfileName,
  popupProfileIconsTitle,
  submitProfileEdit,
  addPlacesOpenBtn,
  popupPlaceName,
  popupPlaceUrl,
  submitNewPlace,
  editPopupSelector,
  profileName,
  profileJob,
  validationConfig
} from "../utils/constants.js";

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
