import {
  MAIN_PAGE_URL,
  AUTH_PAGE_URL,
} from './constants/ui-routes';

export default function onConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  // For any unmatched url, redirect to main page
  $urlRouterProvider.otherwise(MAIN_PAGE_URL);
  $urlRouterProvider.when(AUTH_PAGE_URL, `${AUTH_PAGE_URL}/signin`);

  $stateProvider
    .state('main', {
      abstract: true,
      url: '',
      templateUrl: 'templates/main.html',
    })
    .state('blog', {
      parent: 'main',
      abstract: true,
      url: MAIN_PAGE_URL,
      templateUrl: 'templates/blog.html',
    })
    .state('blog.list', {
      parent: 'blog',
      url: '',
      templateUrl: 'templates/blog-list.html',
      controller: 'BlogController',
      resolve: {
        posts(ApiService) {
          'ngInject';

          return ApiService.Blog.query().$promise;
        },
      },
    })
    .state('blog.post', {
      parent: 'blog',
      url: ':postId',
      templateUrl: 'templates/blog-post-view.html',
      controller: 'BlogPostController',
      resolve: {
        post(ApiService, $stateParams) {
          'ngInject';

          const { postId } = $stateParams;
          return ApiService.Blog.get({ postId }).$promise;
        },
      },
    })
    .state('auth', {
      parent: 'main',
      abstract: true,
      url: AUTH_PAGE_URL,
      controller: 'AuthController',
      templateUrl: 'templates/auth.html',
    })
    .state('auth.signin', {
      url: '/signin',
      controller: 'AuthController',
      template: '<form><label>Signin</label></form>',
    })
    .state('auth.signup', {
      url: '/signup',
      controller: 'AuthController',
      template: '<form><label>Signup</label></form>',
    });
}
