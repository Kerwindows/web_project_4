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

const confirmationPopup = new PopupWithConfirmation(
  "#delete-popup",
  handleDeleteConfirmation
);
confirmationPopup.setEventListeners();

/*---------------delete card------------------*/
addPlacesOpenBtn.addEventListener("click", () => {
  addNewCardPopup.open();
  placesFormValidator.resetValidation();
});

// confirmationPopup.open(() => {
//   card.removeCard();
//   confirmationPopup.close();
// });

/*-------------------- Cards -------------------*/
/*--------------------------------------*/
let userId;

const renderCard = cardDataPlaceHolder => {
  const cardElement = createCard(cardDataPlaceHolder);
  cardList.addItem(cardElement);
};

// here we declare one global section instance
const cardList = new Section(
  {
    renderer: renderCard
  },
  placeList
);

api
  .initialize()
  .then(res => {
    const [user, cardsData] = res;
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

const previewImagePopup = new PopupWithImage("#view__image");
const handleCardClick = item => {
  previewImagePopup.open(item.name, item.link);
};

/*-----------------------New Card Submit Form---------------------------------*/
const addNewCardPopup = new PopupWithForm(addPopupSelector, {
  handleFormSubmit: data => {
    addACard(data);
  }
});

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

const editFormPopup = new PopupWithForm(editPopupSelector, {
  handleFormSubmit: data => {
    editProfile(data);
  }
});

editProfileOpenBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileIconsTitle.value = about;
  editFormPopup.open();
  profileFormValidator.resetValidation();
});
/*------------------------------------Profile picture edit--------------------------*/
const editPofilePicForm = new PopupWithForm("#edit-profile-pic-popup", {
  handleFormSubmit: data => {
    changeProfileImage(data);
  }
});
editPofilePicForm.setEventListeners();
editProfilePicButton.addEventListener("click", () => {
  editPofilePicForm.open();
  profilePicFormValidator.resetValidation();
});
/* --------------------------------- Verification --------------------------------- */
const profileFormValidator = new FormValidator(
  validationConfig,
  submitProfileEdit
);
const placesFormValidator = new FormValidator(validationConfig, submitNewPlace);
const profilePicFormValidator = new FormValidator(
  validationConfig,
  submitNewProfilePic
);

placesFormValidator.enableValidation();
profileFormValidator.enableValidation();
profilePicFormValidator.enableValidation();
editFormPopup.setEventListeners();
previewImagePopup.setEventListeners();
addNewCardPopup.setEventListeners();

function handleDeleteConfirmation(card) {
  confirmationPopup.renderSaving(true);
  api
    .deleteCard(card.getCardId())
    .then(() => {})
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      confirmationPopup.renderSaving(false);
    });
}

const toggleLike = card => {
  api
    .toggleLike(card.getCardId(), card.isLiked())
    .then(likes => {
      card.updateLikes(likes.likes);
    })
    .catch(err => {
      console.log(err);
    });
};

const editProfile = data => {
  editFormPopup.renderSaving(true);
  api
    .setUserInfo(data)
    .then(data => {
      userInfo.setUserInfo({
        name: data.name,
        about: data.about
      });
      editFormPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      editFormPopup.renderSaving(false);
    });
  // userInfo.setUserInfo({
  //   name: data.name,
  //   about: data.about,
  //   avatar: data.avatar
  // });
};

const addACard = data => {
  editFormPopup.renderSaving(true);
  api
    .addCard(data)
    .then(res => {
      renderCard(res);
      // const newCard = createCard(res);
      // placeList.prepend(newCard);

      addNewCardPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      editFormPopup.renderSaving(false);
    });
};

const changeProfileImage = data => {
  editPofilePicForm.renderSaving(true);
  api
    .updateProfilePic(data)
    .then(data => {
      userInfo.setUserAvatar({
        avatar: data.avatar
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

const createCard = cardDataPlaceHolder => {
  const card = new Card(
    cardDataPlaceHolder,
    "#card-template",
    () => {
      handleCardClick(cardDataPlaceHolder);
    },
    () => {
      confirmationPopup.open( () => {
        handleDeleteConfirmation(card);
        card.removeCard();
        confirmationPopup.close();
      });
    },
    () => {
      toggleLike(card);
    },
    userId
  );

  return card.getView();
};
