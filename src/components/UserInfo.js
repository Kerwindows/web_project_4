export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {name: this._name.textContent, occupation: this._job.textContent};
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.occupation;
    }
}