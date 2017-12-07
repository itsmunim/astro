class UserService {
  constructor(simpleHttpService, $auth, $q, _) {
    this.httpService = simpleHttpService;
    this.$auth = $auth;
    this.$q = $q;
    this._ = _;
  }

  getCurrentUser() {
    return this.httpService.makeGETRequest('user/me', null, this._getAuthHeader())
      .then((response) => {
        return response.user;
      });
  }

  updateUser(user) {
    return this.httpService.makePUTRequest('user/me', user, this._getAuthHeader())
      .then((updatedUser) => {
        return updatedUser;
      });
  }

  logOutUser() {
    let fbId = this.UserBasket.user.facebookProfileId;
    return this.httpService.makeDELETERequest('user/' + fbId);
  }

  _getAuthHeader() {
    return {
      Authorization: this.$auth.getToken()
    };
  }
}

UserService.$inject = ['simpleHttpService', '$auth', '$q', '_'];

export default UserService;
