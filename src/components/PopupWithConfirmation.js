import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button"); 
    this._submitButtonText = this._submitButton.textContent; 
    console.log(this._form);
  }
  
  open(action) { 
    this._handleSubmit = action; 
    super.open();
  } 
  close() {
    super.close();
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  renderSaving(isSaving, loadingText = "Saving...") {
    if (isSaving) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

}

export default PopupWithConfirmation;
