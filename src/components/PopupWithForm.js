import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { handleFormSubmit },
    { loadingButtonText = "Saving..." }
  ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__form-input");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    this._objData = {};
    this._inputList.forEach(input => {
      this._objData[input.name] = input.value;
    });
    return this._objData;
  }

  setInputValues(data) {
    this._objInput = {};
    thisrenderSaving._inputList.forEach(input => {
      this._objInput[input.name] = data[input.value];
    });
  }
  renderSaving(isSaving, loadingText = this._loadingButtonText) {
    if (isSaving) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
  }
}
