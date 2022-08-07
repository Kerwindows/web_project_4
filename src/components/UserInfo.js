export default class UserInfo {
  constructor({ nameSelector, jobSelector,profilePicSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._profilePic = document.querySelector(profilePicSelector);
  }

  getUserInfo() {
    return { 
      name: this._name.textContent, 
      about: this._about.textContent 
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar({avatar}){
    this._profilePic.src = avatar;
  }
}
