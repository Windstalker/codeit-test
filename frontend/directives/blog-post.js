export default function BlogPostDirective() {
  return {
    scope: {
      post: '=',
      openLink: '=',
    },
    controller($scope) {
      'ngInject';

      $scope.formatDate = stamp => (new Date(stamp)).toLocaleString();
    },
    restrict: 'E',
    templateUrl: 'templates/directives/blog-post.html',
  };
}
