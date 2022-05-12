let editProfileOpenBtn = document.querySelector(".profile__edit-btn");
let popupForm = document.querySelector(".pop-up");
let editProfileCloseBtn = document.querySelector(".pop-up__close-btn");
let profileName = document.querySelector(".profile__edit-name");
let profileTitle = document.querySelector(".profile__edit-title");
let popupProfileName = popupForm.querySelector(".pop-up__profile-name");
let popupprofileTitle = popupForm.querySelector(".pop-up__profile-title");
let submit = popupForm.querySelector("#pop-up__edit-form");

function showPopup(){
    popupForm.classList.remove("pop-up_hide");
    popupProfileName.value = profileName.textContent;
    popupprofileTitle.value = profileTitle.textContent;
}
function hidePopup(){
    popupForm.classList.add("pop-up_hide");
      
}

editProfileOpenBtn.addEventListener('click',showPopup);
editProfileCloseBtn.addEventListener('click',hidePopup);

function submitForm(evt){
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileTitle.textContent = popupprofileTitle.value;
    hidePopup();
}
submit.addEventListener("submit", submitForm); 