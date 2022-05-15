const editProfileOpenBtn = document.querySelector(".profile__edit-btn");
const popupForm = document.querySelector(".popup");
const editProfileCloseBtn = document.querySelector(".popup__close-btn");
const profileName = document.querySelector(".profile__edit-name");
const proficonstitle = document.querySelector(".profile__about-me");
const popupProfileName = popupForm.querySelector(".popup__form-input_type_profile-name");
const popupproficonstitle = popupForm.querySelector(".popup__form-input_type_profile-about-me");
const submit = popupForm.querySelector(".popup__edit-form");

function showPopup(){
    popupForm.classList.add("popup_opened");
    popupProfileName.value = profileName.textContent;
    popupproficonstitle.value = proficonstitle.textContent;
}
function hidePopup(){
    popupForm.classList.remove("popup_opened");
      
}

editProfileOpenBtn.addEventListener('click',showPopup);
editProfileCloseBtn.addEventListener('click',hidePopup);

function submitForm(evt){
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    proficonstitle.textContent = popupproficonstitle.value;
    hidePopup();
}
submit.addEventListener("submit", submitForm); 