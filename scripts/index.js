/* ------------------------------ edit profile ------------------------------ */
const editProfileOpenBtn    = document.querySelector(".profile__edit-btn");
const profileName           = document.querySelector(".profile__edit-name");
const proficonstitle        = document.querySelector(".profile__about-me");

const popupForm             = document.querySelector(".edit_profile");
const editProfileCloseBtn   = popupForm.querySelector(".popup__close-btn");
const popupProfileName      = popupForm.querySelector(".popup__form-input_type_profile-name");
const popupproficonstitle   = popupForm.querySelector(".popup__form-input_type_profile-about-me");
const submit                = popupForm.querySelector(".popup__edit-form");


/* -------------------------------- add place ------------------------------- */
const popupAddPlaceForm             = document.querySelector(".add__place");
const addPlaceCloseBtn   = popupAddPlaceForm.querySelector(".popup__close-btn");
const addPlaceName      = popupAddPlaceForm.querySelector(".popup__form-input_type_place-name");
const addPlaceTitle   = popupAddPlaceForm.querySelector(".popup__form-input_type_place-link");
const submit                = popupAddPlaceForm.querySelector(".popup__place-form");

/* --------------------------------- popups --------------------------------- */


function showPopup(){
    popupForm.classList.add("popup_opened");
    popupProfileName.value      = profileName.textContent;
    popupproficonstitle.value   = proficonstitle.textContent;
}
function hidePopup(){
    popupForm.classList.remove("popup_opened");
      
}

editProfileOpenBtn.addEventListener('click',showPopup);
editProfileCloseBtn.addEventListener('click',hidePopup);

function submitForm(evt){
    evt.preventDefault();
    profileName.textContent     = popupProfileName.value;
    proficonstitle.textContent  = popupproficonstitle.value;
    hidePopup();
}
submit.addEventListener("submit", submitForm); 


/* ----------------------------- Generate Cards ----------------------------- */
const placeList         = document.querySelector(".cards__list");
const placeTemplate     = document.querySelector("#card-template").content;
const placesList        = placeTemplate.querySelector(".card");
const initialplaces     = [
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    },
    {
        name: "Orlando",
        link: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
      }
  ]; 

initialplaces.forEach(function (card){
    //clone card template
  const placeElement    = placeTemplate.cloneNode(true);   
  //get title element
  const placeName       = placeElement.querySelector(".card__place-name").textContent = card.name;
  const placeImage      = placeElement.querySelector(".card__image").src = card.link;
  placeElement.querySelector(".card__place-favorite").addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__place-favorite_active")
   });
  placeList.prepend(placeElement);
  console.log(placeList);
});




