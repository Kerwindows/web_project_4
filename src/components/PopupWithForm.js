import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".popup__form-input");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._submitButton.textContent = "Saving...";
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    this._objData = {};
    this._inputList.forEach(input => {
      this._objData[input.name] = input.value;
    });
    console.log("_objData", this._objData);
    return this._objData;
  }

  setInputValues(data) {
    this._inputObj = {};
    console.log("this", this);
    this._inputList.forEach(input => {
      console.log(input.value);
      this._inputObj[input.name] = input.value;
    });
    console.log("_inputObj", this._inputObj);
    return this._inputObj;
    //   profileNameInput.textContent = popupProfileName.value;
    //   profileOccupationInput.textContent = popupProfileIconsTitle.value;
  }

  close() {
    super.close();
    this._submitButton.textContent = "Save";
  }

  resetForm() {
    this._form.reset();
  }

  open() {
    super.open();
    this._submitButton.value = this._submitButtonText;
  }
}
