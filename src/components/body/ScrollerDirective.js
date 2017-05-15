import ScrollerController from './ScrollerController';

export default function ScrollerDirective($timeout) {
  return {
    restrict: 'E',
    require: '^dtBody',
    controller: ScrollerController,
    controllerAs: 'scrollCtrl',
    bindToController: {
      options: '<',
    },
    transclude: true,
    replace: true,
    template: '<div ng-style="scrollerStyles()" ng-transclude></div>',
  };
}
