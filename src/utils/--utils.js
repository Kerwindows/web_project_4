/* --------------------------------- All popups --------------------------------- */
function openModal(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEsc);
  popupElement.addEventListener("mousedown", closePopupOnRemoteClick);
}

function closeModal(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEsc);
  popupElement.removeEventListener("mousedown", closePopupOnRemoteClick);
  console.log('something fishy');
}
function closeWithEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closeModal(openedPopup);
  }
}
function closePopupOnRemoteClick(evt) {
  if (evt.target.classList.contains("popup__overlay")) {
    closeModal(evt.currentTarget);
  }
}

export { openModal, closeModal };