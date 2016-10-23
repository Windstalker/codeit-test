import angular from 'angular';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import services from './services';
import controllers from './controllers';
import directives from './directives';

import onRun from './run';
import onConfig from './config';

export default angular.module('app', [
  uiRouter,
  ngResource,
  services.name,
  controllers.name,
  directives.name,
])
.run(onRun)
.config(onConfig);
