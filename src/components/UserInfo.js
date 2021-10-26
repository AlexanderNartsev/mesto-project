

export class UserInfo {
  constructor ({name, activity}, functions) {
    this._name = document.querySelector(`.${name}`),
    this._activity = document.querySelector(`.${activity}`);
    this._getProfileInfo = functions.getUserInfoApi();
    this._profileAvatar = document.querySelector('.profile__avatar');
  }

  //Получаем и записываем данные пользователя
  getUserInfo() {
    const profileData = this._getProfileInfo();
    const profileInfo = {
      id : profileData._id,
      name : profileData.name,
      activityType : profileData.about,
      avatar : profileData.avatar,
      avatarName : profileData.name
    }
    return profileInfo;
  }

  //Отрисовываем на странице данные пользователя
  renderUserInfo() {
    const UserInfo = this.getUserInfo();
    profileId = UserInfo.id;

    this._name.textContent = UserInfo.name;
    this._activity.textContent = UserInfo.activityType;
    profileAvatar.setAttribute('src', UserInfo.avatar);
    profileAvatar.setAttribute('alt', UserInfo.name);
  }

  //Отправляем и отрисовываем новые данные пользователя
  setUserInfo(newProfileData) {

  }
}