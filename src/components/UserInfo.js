import Api from "./Api";
import { userNameSelector } from "./utils/constants";
import { userActivitySelector } from "./utils/constants";

export class UserInfo {
  constructor ({name, activity}) {
    this._name = document.querySelector(`.${name}`),
    this._activity = document.querySelector(`.${activity}`);
  }

  getUserInfo() {
    Api.getUserInfo()
      .then
  }

  setUserInfo() {

  }
}