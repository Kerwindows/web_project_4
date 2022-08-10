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
  submitNewProfilePic,
  profileNameInput,
  popupProfileIconsTitle,
  profileAboutInput,
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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
let userId;

/*---------------Delete card------------------*/
const confirmationPopup = new PopupWithConfirmation("#delete-popup", {
  loadingButtonText: "Deleting..."
});
confirmationPopup.setEventListeners();

/*----------------Render card function----------------*/
const renderCard = cardDataPlaceHolder => {
  const cardElement = createCard(cardDataPlaceHolder);
  cardList.addItem(cardElement);
};

/*----------------Instantiate an object for placing cards into container that contains the cards----------------*/
const cardList = new Section(
  {
    renderer: renderCard
  },
  placeList
);

/*----------------Instantiate object for showing popup image----------------*/

const previewImagePopup = new PopupWithImage("#view__image");
const handleCardClick = item => {
  previewImagePopup.open(item.name, item.link);
};

/*-----------------------New Card Object ---------------------------------*/
const addNewCardPopup = new PopupWithForm(
  addPopupSelector,
  {
    handleFormSubmit: data => {
      addACard(data);
    }
  },
  {
    loadingButtonText: "Saving..."
  }
);

/*----------------Add Card event listener----------------*/
addPlacesOpenBtn.addEventListener("click", () => {
  addNewCardPopup.open();
  placesFormValidator.resetValidation();
});

/*-----------------------Edit Profile Submit Form---------------------------------*/
const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob,
  profilePicSelector: profilePicSelector
});
/*-----------------------New Popup Form object ---------------------------------*/
const editFormPopup = new PopupWithForm(
  editPopupSelector,
  {
    handleFormSubmit: data => {
      editProfile(data);
    }
  },
  {
    loadingButtonText: "Saving..."
  }
);
/*----------------Edit Profile event listener----------------*/
editProfileOpenBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileIconsTitle.value = about;
  editFormPopup.open();
  profileFormValidator.resetValidation();
});
/*------------------------------------Profile picture edit--------------------------*/
const editPofilePicForm = new PopupWithForm(
  "#edit-profile-pic-popup",
  {
    handleFormSubmit: data => {
      changeProfileImage(data);
    }
  },
  {
    loadingButtonText: "Updating image..."
  }
);

/*----------------Edit profile picture event listener----------------*/
editPofilePicForm.setEventListeners();
editProfilePicButton.addEventListener("click", () => {
  editPofilePicForm.open();
  profilePicFormValidator.resetValidation();
});

/* ---------------------------------New Verification object for the profile form --------------------------------- */
const profileFormValidator = new FormValidator(
  validationConfig,
  submitProfileEdit
);
/* ---------------------------------New Verification object for the add card form --------------------------------- */
const placesFormValidator = new FormValidator(validationConfig, submitNewPlace);

/* ---------------------------------New Verification object for the adding new profile pic form --------------------------------- */
const profilePicFormValidator = new FormValidator(
  validationConfig,
  submitNewProfilePic
);
/*-------------------Call Verification object event listener for pupsubmiting--------------------------------*/
placesFormValidator.enableValidation();
profileFormValidator.enableValidation();
profilePicFormValidator.enableValidation();

/*-------------------Call event listeners for popup with forms--------------------------------*/
editFormPopup.setEventListeners();
addNewCardPopup.setEventListeners();

/*-------------------Call event listeners for popup with preview --------------------------------*/
previewImagePopup.setEventListeners();

/*--------------Function for creating new card ----------------------*/
const createCard = cardDataPlaceHolder => {
  const card = new Card(
    cardDataPlaceHolder,
    "#card-template",
    () => {
      handleCardClick(cardDataPlaceHolder);
    },
    () => {
      confirmationPopup.open(() => {
        handleDeleteConfirmation(card);
      });
    },
    () => {
      toggleLike(card);
    },
    userId
  );
  return card.getView();
};

/*------------------ Function to delete or change like status on server and DOM ----------------------------*/
const toggleLike = cardPlaceholder => {
  api
    .toggleLike(cardPlaceholder.getCardId(), cardPlaceholder.isLiked())
    .then(likes => {
      cardPlaceholder.updateLikes(likes.likes);
    })
    .catch(err => {
      console.log(err);
    });
};
/*------------------Function for updating owner profile information on server and DOM----------------------------*/
const editProfile = profileDataPlaceholder => {
  editFormPopup.renderSaving(true);
  api
    .setUserInfo(profileDataPlaceholder)
    .then(profileDataPlaceholder => {
      userInfo.setUserInfo({
        name: profileDataPlaceholder.name,
        about: profileDataPlaceholder.about
      });
      editFormPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      editFormPopup.renderSaving(false);
    });
};
/*--------------Function for adding new card  info to server and the DOM ----------------------*/
const addACard = cardDataPlaceholder => {
  addNewCardPopup.renderSaving(true);
  api
    .addCard(cardDataPlaceholder)
    .then(res => {
      renderCard(res);
      addNewCardPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      addNewCardPopup.renderSaving(false);
    });
};
/*--------------Function for updating profile image string on server and DOM----------------------*/
const changeProfileImage = profileImageUrlPlaceholder => {
  editPofilePicForm.renderSaving(true);
  api
    .updateProfilePic(profileImageUrlPlaceholder)
    .then(profileImageUrlPlaceholder => {
      userInfo.setUserAvatar({
        avatar: profileImageUrlPlaceholder.avatar
      });
      editPofilePicForm.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      editPofilePicForm.renderSaving(false);
    });
};
/*------------------Function to delete card from server and DOM ---------------------------*/
const handleDeleteConfirmation = card => {
  confirmationPopup.renderSaving(true);
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card.removeCard();
      confirmationPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      confirmationPopup.renderSaving(false);
    });
};
/*---------------GET data for cards information and profile information from api---------------------------------*/
api
  .initialize()
  .then(([user, cardsData]) => {
    userId = user._id;
    cardList.renderItems(cardsData);
    userInfo.setUserInfo({
      name: user.name,
      about: user.about
    });
    userInfo.setUserAvatar({
      avatar: user.avatar
    });
  })
  .catch(err => {
    console.log(err);
  });
