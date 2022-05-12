let editProfileOpenBtn = document.querySelector(".profile__edit-btn");
let popupForm = document.querySelector(".pop-up");
let editProfileCloseBtn = document.querySelector(".pop-up__close-btn");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popupProfileName = popupForm.querySelector(".pop-up__profile-name");
let popupProfileTitle = popupForm.querySelector(".pop-up__profile-title");
let submitBtn = popupForm.querySelector(".pop-up__save-btn");


function showPopup(){
    popupForm.classList.remove("pop-up_hide");
    popupProfileName.value = profileTitle.textContent;
    popupProfileTitle.value = profileSubtitle.textContent;
}
function hidePopup(){
    popupForm.classList.add("pop-up_hide");
      
}

editProfileOpenBtn.addEventListener('click',showPopup);
editProfileCloseBtn.addEventListener('click',hidePopup);



function submitForm(){
    //event.preventDefault();
console.log('dztgxzdtg');
    //profileTitle.textContent = popupProfileName.value;
    //profileSubtitle.textContent = popupProfileTitle.value;
    console.log(popupProfileName.value);
    console.log(popupProfileTitle.value);
}

submitBtn.addEventListener("submit", submitForm); 