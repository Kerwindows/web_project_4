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


showInputError (inputElement,errorMessage){
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this.errorClass);

  };
  
  hideInputError (inputElement){
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
  errorElement.classList.remove(this.errorClass);
  errorElement.textContent = "";
  };

  _checkInputValidity (inputElement){
  console.log(inputElement)
        if (!inputElement.validity.valid) {
      this.showInputError(inputElement,inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
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
    this.toggleButtonState(inputList, buttonElement);
    console.log(inputList);
        inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",  () => {
        console.log(inputElement)
        
        
        this._checkInputValidity(inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  };



toggleButtonState(inputList,buttonElement){
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