export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
 
    open() {
        console.log("open function")
       this._popup.classList.add("popup_opened");
       this._popup.addEventListener("mousedown", this._closePopupOnRemoteClick);
       document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        console.log("close function")

        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
       this._popup.removeEventListener("mousedown", this._closePopupOnRemoteClick);
        
    }

    _handleEscClose(evt) {
       // evt.preventDefault(); // does not work outside if statement
        if (evt.key === "Escape") {
            //evt.preventDefault(); would work
            console.log("is this the esc function called?")
            this.close();
        }
    }

    _closePopupOnRemoteClick(evt) {
        console.log(evt.target.classList.contains("popup__overlay"))
        
        if (evt.target.classList.contains("popup__overlay")) {
            console.log('close function from withn the remote click');
          this.close();
   
          
        }
      }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if(evt.target.classList.contains("popup")){
                this.close();
            }
        });
        this._popup.querySelector(".popup__close-btn")
        .addEventListener('click', ()=> this.close());
    }

 
      
}