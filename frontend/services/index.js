import angular from 'angular';
import ApiService from './apiservice';

const appServices = angular.module('app.services', []);
appServices.service('ApiService', ApiService);

export default appServices;
