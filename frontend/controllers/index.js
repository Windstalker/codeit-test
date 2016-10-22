import angular from 'angular';
import BlogController from './blogctrl';
import AuthController from './authctrl';

const appControllers = angular.module('app.controllers', []);
appControllers.controller('BlogController', BlogController);
appControllers.controller('AuthController', AuthController);

export default appControllers;
