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
  submitProfileEdit,
  addPlacesOpenBtn,
  popupPlaceName,
  popupPlaceUrl,
  popupProfileName,
  profileNameInput,
  popupProfileIconsTitle,
  profileOccupationInput,
  submitNewPlace,
  editPopupSelector,
  profileName,
  profileJob,
  validationConfig
} from "../utils/constants.js";

/*-------------------- Cards -------------------*/
const createCard = cardData => {
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
};

//section called cardList created for cards
const cardList = new Section(
  {
    items: initialPlaces,
    renderer: cardData => {
      cardList.addItem(createCard(cardData));
    }
  },
  placeList
);

const previewImagePopup = new PopupWithImage("#view__image");

const handleCardClick = item => {
  previewImagePopup.open(item.name, item.link);
};

/*-----------------------New Card Submit Form---------------------------------*/
const addNewCard = new PopupWithForm(addPopupSelector, {
  handleFormSubmit: data => {
    //create card and add to card list section
    cardList.addItem(createCard(data));
    addNewCard.close();
  }
});

addPlacesOpenBtn.addEventListener("click", () => {
  addNewCard.open();
  placesFormValidator.resetValidation();
});

/*-----------------------Edit Profile Submit Form---------------------------------*/

const newUserInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob
});

const editFormPopup = new PopupWithForm(editPopupSelector, {
  handleFormSubmit: data => {
    newUserInfo.setUserInfo(data);
    editFormPopup.close();
  }
});

editProfileOpenBtn.addEventListener("click", () => {
  const { name, occupation } = newUserInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileIconsTitle.value = occupation;
  editFormPopup.open();
  profileFormValidator.resetValidation();
});

/* --------------------------------- Verification --------------------------------- */
const profileFormValidator = new FormValidator(
  validationConfig,
  submitProfileEdit
);
const placesFormValidator = new FormValidator(validationConfig, submitNewPlace);

cardList.renderItems();
placesFormValidator.enableValidation();
profileFormValidator.enableValidation();
editFormPopup.setEventListeners();
previewImagePopup.setEventListeners();
addNewCard.setEventListeners();
