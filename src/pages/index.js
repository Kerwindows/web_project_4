import {
  placeList,
  addPopupSelector,
  editProfileOpenBtn,
  submitProfileEdit,
  addPlacesOpenBtn,
  editProfilePicButton,
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
import "./index.css";
import { api } from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import FormValidator from "../components/FormValidator.js";
const deletePopup = new PopupWithDelete(
  "#delete-popup",
  handleDeleteConfirmation
);
deletePopup.setEventListeners();

/*---------------delete card------------------*/
addPlacesOpenBtn.addEventListener("click", () => {
  addNewCard.open();
  placesFormValidator.resetValidation();
});

/*-------------------- Cards -------------------*/
const createCard = cardData => {
  const card = new Card(
    cardData,
    "#card-template",
    () => {
      handleCardClick(cardData);
    },
    () => {
      deletePopup.open(card);
    },
    () => {
      toggleLike(card);
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
    newUserInfo.setUserInfo({
      name: data.name,
      occupation: data.occupation,
      avatar: data.avatar
    });
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
/*------------------------------------Profile picture edit--------------------------*/
const editPofilePicForm = new PopupWithForm(
  "#edit-profile-pic-popup",
  handleProfilePicSubmit
);
editPofilePicForm.setEventListeners();
editProfilePicButton.addEventListener("click", () => {
  editPofilePicForm.open();
  profilePicFormValidator.checkInputStatus();
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
      //card.remove();
      deletePopup.close();
      
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      deletePopup.renderSaving(false);
    });
}

function toggleLike(card) {
  api
    .toggleLike(card._id, card.isLiked())
    .then((likes) => {
      card.updateLikes(likes.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}



function handleProfilePicSubmit(data) {
  editPofilePicForm.renderSaving(true);
  api
    .updateProfilePic(data)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        title: data.about,
        avatar: data.avatar,
      });
      editPofilePicForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPofilePicForm.renderSaving(false);
    });
}
