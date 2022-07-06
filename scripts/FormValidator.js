class FormValidator{
    constructor (validationConfig,formElement){

   
     this.form = formElement;
 
     this.formSelector = validationConfig.formSelector;
     this.inputSelector = validationConfig.inputSelector;
     this.submitButtonSelector =  validationConfig.submitButtonSelector;
     this.inactiveButtonClass = validationConfig.inactiveButtonClass;
     this.inputErrorClass = validationConfig.inputErrorClass;
     this.errorClass = validationConfig.errorClass;


} 


_showInputError (inputElement,errorMessage){
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this.errorClass);

  };
  
  _hideInputError (inputElement){
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
  errorElement.classList.remove(this.errorClass);
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
    const inputList = [ ...this.form.querySelectorAll(this.inputSelector) ];
    const buttonElement = this.form.querySelector(
      this.submitButtonSelector
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
        buttonElement.classList.add(this.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
      } else {
        buttonElement.classList.remove(this.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
      }
}

enableValidation(){
    this.form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };


}






export default FormValidator;