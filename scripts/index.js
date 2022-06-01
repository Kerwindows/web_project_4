/* ------------------------------ edit profile  ------------------------------ */
const editProfileOpenBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__edit-name");
const profileIconsTitle = document.querySelector(".profile__about-me");
const popupForm = document.querySelector("#edit__profile");
const editProfileCloseBtn = document.querySelector(".popup__edit-close-btn");
const popupProfileName = document.querySelector(
  ".popup__form-input_type_profile-name"
);
const popupProfileIconsTitle = document.querySelector(
  ".popup__form-input_type_profile-about-me"
);
const submit = document.querySelector(".popup__edit-form");
// profileIconsTitle => profileIconsTitle
/* -------------------------------- add place ------------------------------- */
const popupAddPlaceForm = document.querySelector("#add__place");
const addPlacesOpenBtn = document.querySelector(".profile__add-places-btn");
const addPlaceCloseBtn = document.querySelector(".popup__place-close-btn");
const submitPlace = document.querySelector(".popup__place-form");
const popupPlaceName = document.querySelector(
  ".popup__form-input_type_place-name"
);
const popupPlaceUrl = document.querySelector(
  ".popup__form-input_type_place-link"
);
const submitNewPlace = document.querySelector(".popup__place-form");
const noPlaceFound = document.querySelector(".cards__no-places");
/* ----------------------------- Generate Cards ----------------------------- */
const placeList = document.querySelector(".cards__list");
const htmlCardsTemplate =
  document.querySelector("#card-template").content.firstElementChild;
/* ------------------------------ image preview ----------------------------- */
const imagePopup = document.querySelector("#view__image");
const viewImageCloseBtn = document.querySelector(".popup__image-close-btn");
/* --------------------------------- places --------------------------------- */
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
/* --------------------------------- popups --------------------------------- */
function openModal(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closeModal(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function showPreviewImage({ name, link }) {
  // add open class to popup
  openModal(imagePopup);

  const imageElement = document.querySelector(".popup__card-image-preview");
  imageElement.src = link;
  imageElement.alt = name;
  document.querySelector(".popup__card-image-preview-name").textContent = name;
}

function clearAddPlace() {
  popupPlaceName.value = "";
  popupPlaceUrl.value = "";
}

//submit profile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileIconsTitle.textContent = popupProfileIconsTitle.value;
  closeModal(popupForm);
}

const handleDeleteButton = () => {
  cardElement.remove();
  //check to see if there are any places listed
  if (placeList.childNodes.length) {
    noPlaceFound.classList.remove("cards__no-places_active");
  } else {
    noPlaceFound.classList.add("cards__no-places_active");
  }
};

const handleLikeButton = (evt) => {
  evt.target.classList.toggle("card__place-favorite_active");
};

// cardData = {name: ..., link: ...}
function generateCardElement(cardData) {
  const cardElement = htmlCardsTemplate.cloneNode(true);

  // add title to card
  cardElement.querySelector(".card__place-name").textContent = cardData.name;

  // add src and alt to image
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  // add click listener for like button
  cardElement
    .querySelector(".card__place-favorite")
    .addEventListener("click", handleLikeButton);

  // add listener for delete button
  const deleteButton = cardElement.querySelector(".card__trash");

  deleteButton.addEventListener("click", handleDeleteButton);

  // add click listener to image element
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    showPreviewImage(cardData);
  });

  return cardElement;
}

function addCard(cardElement, container) {
  container.prepend(cardElement);
}

//submit new place
function submitAddPlaceForm(evt) {
  evt.preventDefault();
  const name = popupPlaceName.value;
  const link = popupPlaceUrl.value;

  const cardElement = generateCardElement({ name, link });

  //remove no places found class on adding a new place
  noPlaceFound.classList.remove("cards__no-places_active");

  addCard(cardElement, placeList);

  closeModal(popupAddPlaceForm);

  clearAddPlace();
}

//display places from array object
initialPlaces.forEach(function (cardData) {
  const cardElement = generateCardElement(cardData);

  addCard(cardElement, placeList);
});

//profile edit
editProfileOpenBtn.addEventListener("click", () => {
  popupProfileName.value = profileName.textContent;
  popupProfileIconsTitle.value = profileIconsTitle.textContent;
  openModal(popupForm);
});

editProfileCloseBtn.addEventListener("click", () => closeModal(popupForm));

submit.addEventListener("submit", submitEditProfileForm);

//add place
addPlacesOpenBtn.addEventListener("click", () => openModal(popupAddPlaceForm));

addPlaceCloseBtn.addEventListener("click", () => closeModal(popupAddPlaceForm));

submitNewPlace.addEventListener("submit", submitAddPlaceForm);

//image preview
viewImageCloseBtn.addEventListener("click", () => closeModal(imagePopup));