export class UserInfo {
  constructor (profileSelectors, getUserData, patchUserData) {
    this._name = document.querySelector(profileSelectors.userNameSelector);
    this._activity = document.querySelector(profileSelectors.userActivitySelector);
    this._getUserData = getUserData;
    this._patchUserData = patchUserData;
    this._profileAvatar = document.querySelector('.profile__avatar');
  }

  //Получаем данные профиля с сервера
  getUserInfo() {
    return this._getUserData();
  }

  // renderUserInfo() {
  //   this.getUserInfo()
  //     .then((res) => {
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  setUserInfo(newProfileData) {
    //Отправляем данные на сервер
    this._patchUserData(newProfileData.name, newProfileData.about);

    //Добавляем данные на страницу
    this._name.textContent = newProfileData.name;
    this._activity.textContent = newProfileData.about;
    this._profileAvatar.setAttribute('src', newProfileData.avatar);
    this._profileAvatar.setAttribute('alt', newProfileData.name);
  }
  
}