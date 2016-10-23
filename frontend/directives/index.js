import angular from 'angular';
import blogPost from './blog-post';

export default angular
.module('app.directives', [])
.directive('blogPost', blogPost);
