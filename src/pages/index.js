import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import {
  placeList,
  addPopupSelector,
  editProfileOpenBtn,
  submitProfileEdit,
  addPlacesOpenBtn,
  profilePicSelector,
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

const deletePopup = new PopupWithDelete(
  "#delete-popup",
  handleDeleteConfirmation
);
deletePopup.setEventListeners();


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
    },
    () => {
      deletePopup.open(card);
    }
  );

  return card.getView();
};

api
  .initialize()
  .then(res => {
    const [user, data] = res;
    const cardList = new Section(
      {
        items: data,
        renderer: item => {
          let userId = user._id;
          cardList.addItem(
            createCard({
              name: item.name,
              link: item.link,
              likes: item.likes,
              owner: item.owner,
              _id: item._id,
              userId
            })
          );
        }
      },
      placeList
    );
    cardList.renderItems();
    newUserInfo.setUserInfo({
      name: user.name,
      occupation: user.about,
      avatar: user.avatar
    });
  })
  .catch(err => {
    console.log(err);
  });

const previewImagePopup = new PopupWithImage("#view__image");

const handleCardClick = item => {
  previewImagePopup.open(item.name, item.link);
};

/*---------------delete card------------------*/
addPlacesOpenBtn.addEventListener("click", () => {
  addNewCard.open();
  placesFormValidator.resetValidation();
});



/*-----------------------New Card Submit Form---------------------------------*/
const addNewCard = new PopupWithForm(addPopupSelector, {
  handleFormSubmit: data => {
    api
      .addCard(data)
      .then(res => {
        const newCard = createCard(data);
        placeList.prepend(newCard);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        addNewCard.renderSaving(false);
      });
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
  jobSelector: profileJob,
  profilePicSelector: profilePicSelector
});

const editFormPopup = new PopupWithForm(editPopupSelector, {
  handleFormSubmit: data => {
    api
      .setUserInfo(data)
      .then(data => {
        newUserInfo.setUserInfo({
          name: data.name,
          occupation: data.about,
          avatar: data.avatar
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        editFormPopup.renderSaving(false);
      });
    newUserInfo.setUserInfo({ name: data.name, occupation: data.occupation,avatar:data.avatar});
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

placesFormValidator.enableValidation();
profileFormValidator.enableValidation();
editFormPopup.setEventListeners();
previewImagePopup.setEventListeners();
addNewCard.setEventListeners();

function handleDeleteConfirmation(card) {
  deletePopup.renderSaving(true);
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card.handleDelete();
      deletePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      deletePopup.renderSaving(false);
    });
}
