import {
  SIGNIN_URL,
  SIGNUP_URL,
  EMAIL_CHECK_URL,
  LOGOUT_URL,
} from '../constants/api-routes';

export default class AuthService {
  constructor($http) {
    'ngInject';

    this.token = '';
    this.currentUser = null;

    this.signIn = (email, password) => $http.post(SIGNIN_URL, { email, password });
    this.signUp = (email, password) => $http.post(SIGNUP_URL, { email, password });
    this.checkEmail = email => $http.get(`${EMAIL_CHECK_URL}/${email}`);
    this.logOut = () => {
      this.token = '';
      return $http.post(LOGOUT_URL);
    };
    this.isLoggedIn = () => !!this.token.length;
  }
}
