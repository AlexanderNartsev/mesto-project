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

  renderUserInfo() {
    this.getUserInfo().then((res) => {
      this._name.textContent = res.name;
      this._activity.textContent = res.about;
      this._profileAvatar.setAttribute('src', res.avatar);
      this._profileAvatar.setAttribute('alt', res.name);
    })
  }

  setUserInfo(newProfileData) {
    //Отправляем данные на сервер
    this._patchUserData(newProfileData.name, newProfileData.about, newProfileData.avatar);

    //Обновляем отрисовку данных профиля 
    this.renderUserInfo();
    // profileId = UserInfo.id;
  }
  
}