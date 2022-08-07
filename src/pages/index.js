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
const deletePopup = new PopupWithConfirmation(
  "#delete-popup",
  handleDeleteConfirmation
);
deletePopup.setEventListeners();

/*---------------delete card------------------*/
addPlacesOpenBtn.addEventListener("click", () => {
  addNewCardPopup.open();
  placesFormValidator.resetValidation();
});

/*-------------------- Cards -------------------*/

let userId;

api
  .initialize()
  .then(res => {
    const [user, cardsData] = res;
    const cardList = new Section(
      {
        items: cardsData,
        renderer: item => {
          userId = user._id;
          cardList.addItem(
            createCard({
              name: item.name,
              link: item.link,
              likes: item.likes,
              owner: item.owner,
              _id: item._id
            })
          );
        }
      },
      placeList
    );
    console.log(cardList);
    cardList.renderItems();
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
  deletePopup.renderSaving(true);
  api
    .deleteCard(card.getCardId())
    .then(() => {
      // delete card from DOM
      card.removeCard();
      deletePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      deletePopup.renderSaving(false);
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
      const newCard = createCard(res);
      placeList.prepend(newCard);
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
    },
    userId
  );

  return card.getView();
};
