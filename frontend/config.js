import {
  MAIN_PAGE_URL,
  AUTH_PAGE_URL,
} from './constants/ui-routes';

export default function onConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  // For any unmatched url, redirect to main page
  $urlRouterProvider.otherwise(MAIN_PAGE_URL);

  $stateProvider
    .state('blog', {
      url: MAIN_PAGE_URL,
      controller: 'BlogController',
      template: '<div>Blog view</div>',
    })
    .state('auth', {
      url: AUTH_PAGE_URL,
      controller: 'AuthController',
      template: '<div>Auth view</div>',
    });
}
