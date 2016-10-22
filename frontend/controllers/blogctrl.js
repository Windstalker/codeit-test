export default function BlogController($scope, ApiService) {
  'ngInject';

  $scope.posts = ApiService.Blog.query();
  console.log($scope.posts);
}
