const editProfileOpenBtn = document.querySelector(".profile__edit-btn");
const popupForm = document.querySelector(".pop-up");
const editProfileCloseBtn = document.querySelector(".pop-up__close-btn");
const profileName = document.querySelector(".profile__edit-name");
const proficonstitle = document.querySelector(".profile__edit-title");
const popupProfileName = popupForm.querySelector(".pop-up__form-input_type_profile-name");
const popupproficonstitle = popupForm.querySelector(".pop-up__form-input_type_profile-title");
const submit = popupForm.querySelector(".pop-up__edit-form");

function showPopup(){
    popupForm.classList.remove("pop-up_hide");
    popupProfileName.value = profileName.textContent;
    popupproficonstitle.value = proficonstitle.textContent;
}
function hidePopup(){
    popupForm.classList.add("pop-up_hide");
      
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