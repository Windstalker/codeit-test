import angular from 'angular';
import AuthService from './auth-service';
import BlogService from './blog-service';

const appServices = angular.module('app.services', []);
appServices.service('AuthService', AuthService);
appServices.service('BlogService', BlogService);

export default appServices;
