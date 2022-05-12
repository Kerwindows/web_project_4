let editProfileOpenBtn = document.querySelector(".profile__edit-btn");
let popupForm = document.querySelector(".pop-up");
let editProfileCloseBtn = document.querySelector(".pop-up__close-btn");
let profileTitle = document.querySelector(".profile__title").textContent;
let profileSubtitle = document.querySelector(".profile__subtitle").textContent;
let popupProfileName = popupForm.querySelector(".pop-up__profile-name");
let popupProfileTitle = popupForm.querySelector(".pop-up__profile-title");


function showPopup(){
    popupForm.classList.remove("pop-up_hide");
    popupProfileName.value = profileTitle;
    popupProfileTitle.value = profileSubtitle;
}
function hidePopup(){
    popupForm.classList.add("pop-up_hide");
      
  }

editProfileOpenBtn.addEventListener('click',showPopup);
editProfileCloseBtn.addEventListener('click',hidePopup);
