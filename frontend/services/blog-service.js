import {
  BLOG_URL,
} from '../constants/api-routes';

export default function BlogService($http, $resource) {
  'ngInject';

  return $resource(`${BLOG_URL}/:postId`);
}
