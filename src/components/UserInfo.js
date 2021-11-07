export class UserInfo {
  constructor (profileSelectors, getUserData, patchUserData, patchAvatar) {
    this._name = document.querySelector(profileSelectors.userNameSelector);
    this._activity = document.querySelector(profileSelectors.userActivitySelector);
    this._getUserData = getUserData;
    this._patchUserData = patchUserData;
    this._patchAvatar = patchAvatar;
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

  setUserInfo({name, description, avatar, shouldUpdate}) {
    if(shouldUpdate) {
      if(avatar) {
        this._patchAvatar(avatar);
      } else {
        //Отправляем данные на сервер
        this._patchUserData(name, description);
      }
    };

    //Добавляем данные на страницу
    if(avatar) {
      this._profileAvatar.setAttribute('src', avatar);
      this._profileAvatar.setAttribute('alt', name);
    }

    if(name, description) {
      this._name.textContent = name;
      this._activity.textContent = description;
    }
  }
  
}