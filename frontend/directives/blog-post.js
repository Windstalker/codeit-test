export default function BlogPostDirective() {
  return {
    scope: {
      post: '=',
      openLink: '=',
      onRemove: '&',
    },
    controller($scope) {
      'ngInject';

      $scope.formatDate = stamp => (new Date(stamp)).toLocaleString();
      $scope.handleRemove = () => $scope.onRemove($scope.post.id);
    },
    restrict: 'E',
    templateUrl: 'templates/directives/blog-post.html',
  };
}
