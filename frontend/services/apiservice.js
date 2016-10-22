import {
  BLOG_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  EMAIL_CHECK_URL,
  LOGOUT_URL,
} from '../constants/api-routes';

export default class ApiService {
  constructor($http, $resource) {
    'ngInject';

    console.log('api service init');
    this.Blog = $resource(`${BLOG_URL}/:postId`);
    this.signIn = (email, password) => $http.post(SIGNIN_URL, { email, password });
    this.signUp = (email, password) => $http.post(SIGNUP_URL, { email, password });
    this.checkEmail = email => $http.get(`${EMAIL_CHECK_URL}/${email}`);
    this.logOut = () => $http.post(LOGOUT_URL);
  }
}
