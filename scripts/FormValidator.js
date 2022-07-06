class FormValidator{
    constructor (validationConfig,formElement){

   
     this._form = formElement;
 
     this._formSelector = validationConfig.formSelector;
     this._inputSelector = validationConfig.inputSelector;
     this._submitButtonSelector =  validationConfig.submitButtonSelector;
     this._inactiveButtonClass = validationConfig.inactiveButtonClass;
     this._inputErrorClass = validationConfig.inputErrorClass;
     this._errorClass = validationConfig.errorClass;


} 


_showInputError (inputElement,errorMessage){
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);

  };
  
  _hideInputError (inputElement){
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = "";
  };

  _checkInputValidity (inputElement){
        if (!inputElement.validity.valid) {
      this._showInputError(inputElement,inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

 _setEventListeners(){
    const inputList = [ ...this._form.querySelectorAll(this._inputSelector) ];
    const buttonElement = this._form.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",  () => {
        
        
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };



_toggleButtonState(inputList,buttonElement){
    if (this.hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
      }
}

enableValidation(){
    this._form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };


}






export default FormValidator;