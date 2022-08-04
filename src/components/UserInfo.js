export default class UserInfo {
  constructor({ nameSelector, jobSelector,profilePicSelector }) {
    this._name = document.querySelector(nameSelector);
    this._occupation = document.querySelector(jobSelector);
    this._profilePic = document.querySelector(profilePicSelector);
    console.log
  }

  getUserInfo() {
    return { 
      name: this._name.textContent, 
      occupation: this._occupation.textContent 
    }
  }

  setUserInfo({ name, occupation, avatar }) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
    this._profilePic.src = avatar;
  }
}
