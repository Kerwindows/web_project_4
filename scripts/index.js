/* ------------------------------ edit profile  ------------------------------ */

const editProfileOpenBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__edit-name");
const proficonstitle = document.querySelector(".profile__about-me");
const popupForm = document.querySelector("#edit__profile");
const editProfileCloseBtn = document.querySelector(".popup__edit-close-btn");
const popupProfileName = document.querySelector(".popup__form-input_type_profile-name");
const popupProfIconsTitle = document.querySelector(".popup__form-input_type_profile-about-me");
const submit = document.querySelector(".popup__edit-form");

/* -------------------------------- add place ------------------------------- */

const popupAddPlaceForm = document.querySelector("#add__place");
const addPlacesOpenBtn = document.querySelector(".profile__add-places-btn");
const addPlaceCloseBtn = document.querySelector(".popup__place-close-btn");
const submitPlace = document.querySelector(".popup__place-form");
const popupPlaceName = document.querySelector(".popup__form-input_type_place-name");
const popupPlaceUrl = document.querySelector(".popup__form-input_type_place-link");
const submitNewPlace = document.querySelector(".popup__place-form");
const noPlaceFound = document.querySelector(".cards__no-songs");

/* ----------------------------- Generate Cards ----------------------------- */

const placeList = document.querySelector(".cards__list");
const placeTemplate = document.querySelector("#card-template").content;

/* ------------------------------ image preview ----------------------------- */
const imagePopup = document.querySelector("#view__image");
const viewImageCloseBtn = document.querySelector(".popup__image-close-btn");

/* --------------------------------- places --------------------------------- */
const initialplaces = [{
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
}, {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
}, {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
}, {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
}, {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
}, {
    name: "Orlando",
    link: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
}];
/* --------------------------------- popups --------------------------------- */

function showEditProfilePopup() {
    popupForm.classList.add("popup_opened");
    popupProfileName.value = profileName.textContent;
    popupProfIconsTitle.value = proficonstitle.textContent;
}

function hideEditProfilePopup() {
    popupForm.classList.remove("popup_opened");
}

function showAddPlacePopup() {
    popupAddPlaceForm.classList.add("popup_opened");
}

function hideAddPlacePopup() {
    popupAddPlaceForm.classList.remove("popup_opened");
}

function showPreviewImage(img) {
    imagePopup.classList.add("popup_opened");
    const popupImg = document.querySelector(".popup__card-image-preview").src = img;
}

function hidePreviewImage() {
    imagePopup.classList.remove("popup_opened");
}

function clearForm() {
    popupPlaceName.value = '';
    popupPlaceUrl.value = '';
}
function deletePlace() {
    popupPlaceName.value = '';
    popupPlaceUrl.value = '';
}
//submit profile
function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    proficonstitle.textContent = popupProfIconsTitle.value;
    hideEditProfilePopup();
}



//submit new place
function submitAddPlaceForm(evt) {
    evt.preventDefault();
    const placeName = popupPlaceName.value;
    const placeLink = popupPlaceUrl.value;
    const placeElementAdd = placeTemplate.cloneNode(true);
    const place = placeElementAdd.querySelector(".card");
    placeElementAdd.querySelector(".card__place-name").textContent = placeName;
    placeElementAdd.querySelector(".card__image").src = placeLink;
    placeElementAdd.querySelector(".card__place-favorite").addEventListener("click", function(evt) {
        evt.target.classList.toggle("card__place-favorite_active")
    });

    placeElementAdd.querySelector(".card__trash").addEventListener("click", ()=>{
        place.remove();
        if (placeList.textContent.trim().length == '') {
            noPlaceFound.classList.add("cards__no-songs_active");

        } else {
            noPlaceFound.classList.remove("cards__no-songs_active");
        }
    }
    );
    noPlaceFound.classList.remove("cards__no-songs_active");
    placeList.prepend(placeElementAdd);
    hideAddPlacePopup();
    clearForm();
}

//display places from array object
initialplaces.forEach(function(card) {
    //clone card template
    const placeElement = placeTemplate.cloneNode(true);
    const place = placeElement.querySelector(".card");
    //get title element
    placeElement.querySelector(".card__place-name").textContent = card.name;
    const img = placeElement.querySelector(".card__image").src = card.link;
    placeElement.querySelector(".card__place-favorite").addEventListener("click", function(evt) {
        evt.target.classList.toggle("card__place-favorite_active")
    });
    placeElement.querySelector(".card__trash").addEventListener("click", ()=>{
        place.remove();
        if (placeList.textContent.trim().length == '') {
            noPlaceFound.classList.add("cards__no-songs_active");

        } else {
            noPlaceFound.classList.remove("cards__no-songs_active");
        }
    }
    );

    placeElement.querySelector(".card__image").addEventListener("click", ()=>{
        showPreviewImage(img);
    }
    );

    placeList.prepend(placeElement);
});
//profile edit
editProfileOpenBtn.addEventListener('click', showEditProfilePopup);
editProfileCloseBtn.addEventListener('click', hideEditProfilePopup);
submit.addEventListener("submit", submitEditProfileForm);

//add place
addPlacesOpenBtn.addEventListener('click', showAddPlacePopup);
addPlaceCloseBtn.addEventListener('click', hideAddPlacePopup);
submitNewPlace.addEventListener("submit", submitAddPlaceForm);

//image preview
viewImageCloseBtn.addEventListener("click", ()=>{ hidePreviewImage();});


