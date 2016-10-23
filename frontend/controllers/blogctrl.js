export default function BlogController($scope, ApiService, posts, orderByFilter) {
  'ngInject';

  const sortByPostDate = (collection, reverse) =>
    orderByFilter(collection, 'created', reverse);
  $scope.reverse = true;
  $scope.posts = sortByPostDate(posts, $scope.reverse);

  $scope.toggleOrder = () => {
    $scope.reverse = !$scope.reverse;
    $scope.posts = sortByPostDate($scope.posts, $scope.reverse);
  };
  $scope.deletePost = postId =>
    $scope.posts.get({ postId })
    .then(post => post.$remove());
}
