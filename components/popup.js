export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(`${popupSelector}`);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
 
    open() {
       this._popup.classList.add("popup_opened");
       this._popup.addEventListener("mousedown", this.closePopupOnRemoteClick);
   
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
       this._popup.removeEventListener("mousedown", this.closePopupOnRemoteClick);
        
    }

    _handleEscClose(evt) {
       // evt.preventDefault(); // does not work outside if statement
        if (evt.key === "Escape") {
            //evt.preventDefault(); would work
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

    closeWithEsc(event) {
        if (event.key === "Escape") {
          const openedPopup = document.querySelector(".popup_opened");
          closeModal(openedPopup);
        }
      }
      closePopupOnRemoteClick(evt) {
        if (evt.target.classList.contains("popup__overlay")) {
          closeModal(evt.currentTarget);
        }
      }
}