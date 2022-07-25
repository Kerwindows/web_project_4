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

  submitAddPlaceForm = evt => {
    evt.preventDefault();
    const newCardElement = createCard({ name, link });
    this.close();
    placesFormValidator.toggleButtonState();
  };

  _getInputValues() {
    this._objData = {};
    this._inputList.forEach(input => {
      this._objData[input.name] = input.value;
    });
    return this._objData;
  }

  setInputValues(data) {
    this._objInput = {};
    this._inputList.forEach(input => {
      console.log(data);
      this._objInput[input.name] = data[input.value];
    });
  }

  close() {
    super.close();
    this._submitButton.textContent = "Save";
    this._form.reset();
  }

  open() {
    super.open();
    this._submitButton.value = this._submitButtonText;
  }
}
