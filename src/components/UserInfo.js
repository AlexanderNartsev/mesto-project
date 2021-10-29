

export class UserInfo {
  constructor (profileSelectors, getUserData) {
    this._name = document.querySelector(profileSelectors.userNameSelector);
    this._activity = document.querySelector(profileSelectors.userActivitySelector);
    this._getUserData = getUserData;
    this._profileAvatar = document.querySelector('.profile__avatar');
  }

  //Получаем данные профиля с сервера
  getUserInfo() {
    return this._getUserData();
  }

  //Отрисовываем на странице данные пользователя
  renderUserInfo() {

    this.getUserInfo().then((res) => {
      this._name.textContent = res.name;
      this._activity.textContent = res.activityType;
      this._profileAvatar.setAttribute('src', res.avatar);
      this._profileAvatar.setAttribute('alt', res.name);
    })
    // profileId = UserInfo.id;
  }

  setUserInfo(newProfileData) {
    //Тут отправляем данные на сервер, после чего вызываем renderUserInfo
  }

  
}