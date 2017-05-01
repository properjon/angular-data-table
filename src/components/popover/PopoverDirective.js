import POSITION from './Popover.constants';

/**
 * Popover Directive
 * @param {function} $animate
 * @param {function} $compile
 * @param {function} $document
 * @param {function} $http
 * @param {object} $q
 * @param {function} $templateCache
 * @param {function} $timeout
 * @param {function} PopoverRegistry
 * @param {function} PositionHelper
 */

export default function PopoverDirective($animate, $compile, $document, $http,
  $q, $templateCache, $timeout, PopoverRegistry, PositionHelper) {
  /**
   * Loads a template from the template cache
   * @param  {string} template
   * @param  {boolean} plain
   * @return {object}  html template
   */
  function loadTemplate(template, plain) {
    if (!template) {
      return '';
    }

    if (angular.isString(template) && plain) {
      return template;
    }

    return $templateCache.get(template) || $http.get(template, { cache: true });
  }

  /**
   * Determines a boolean given a value
   * @param  {object} value
   * @return {boolean}
   */
  function toBoolean(value) {
    if (value && value.length !== 0) {
      const v = value.toString().toLowerCase();
      value = (v === 'true');
    } else {
      value = false;
    }

    return value;
  }

  return {
    restrict: 'A',
    scope: true,
    replace: false,
    link($scope, $element, $attributes) {
      $scope.popover = null;

      $scope.options = {
        alignment: $attributes.popoverAlignment || 'middle',
        placement: $attributes.popoverPlacement || 'right',
        plain: toBoolean($attributes.popoverPlain || false),
        popoverId: $attributes.popoverId,
        showCaret: toBoolean($attributes.popoverPlain || false),
        spacing: parseInt($attributes.popoverSpacing, 10) || 0,
        template: $attributes.popoverTemplate,
        text: $attributes.popoverText,
      };

      $scope.$on('$destroy', () => {
        $element.off();
      });

      // attach mouse events to element
      $element.on('mouseenter', display);
      $element.on('mouseleave', beginTimeout);
      $element.on('mousemove', cancelTimeout);

      /**
       * Begin a timeout of 500ms before hiding popover
       */
      function beginTimeout() {
        $scope.exitTimeout = $timeout(remove, 500);
      }

      /**
       * Cancel the timeout to keep popover visible
       */
      function cancelTimeout() {
        $timeout.cancel($scope.exitTimeout);
      }

      /**
       * Displays the popover on the page
       */
      function display() {
        // Cancel exit timeout
        cancelTimeout();

        const elm = $document[0].getElementById($scope.options.popoverId);
        if ($scope.popover && elm) return;

        if ($scope.options.text && !$scope.options.template) {
          displayTextPopover();
        } else {
          displayTemplatePopover();
        }
      }

      /**
       * When using template, load and compile the template prior to appending popover
       */
      function displayTemplatePopover() {
        $q.when(loadTemplate($scope.options.template, $scope.options.plain)).then((template) => {
          if (!angular.isString(template)) {
            if (template.data && angular.isString(template.data)) {
              template = template.data;
            } else {
              template = '';
            }
          }

          buildElement('template');

          $scope.popover.html(template);
          $compile($scope.popover)($scope);
          angular.element($document.body).append($scope.popover);
          positionPopover($element, $scope.popover, $scope.options);

          managePopover();
        });
      }

      /**
       * With text only, simply build up the popover and append it to body
       */
      function displayTextPopover() {
        buildElement('text');

        $scope.popover.html($scope.options.text);
        angular.element($document[0].body).append($scope.popover);

        managePopover();
      }

      function buildElement(type) {
        $scope.popover = angular.element(`<div
          class="dt-popover popover${$scope.options.placement}"
          id="${$scope.options.popoverId}"></div>`);

        if (type === 'text') {
          $scope.popover.addClass('popover-text');
        }
      }

      /**
       * Position popover, bind handlers, and register popover
       */
      function managePopover() {
        positionPopover($element, $scope.popover, $scope.options);

        // attach mouse events to popover
        $scope.popover.on('mouseleave', beginTimeout);
        $scope.popover.on('mousemove', cancelTimeout);

        PopoverRegistry.add($scope.options.popoverId, {
          element: $element,
          popover: $scope.popover,
        });
      }

      /**
       * Removes the template from the registry and page
       */
      function remove() {
        if ($scope.popover) {
          $scope.popover.off();
          $scope.popover.remove();
        }

        $scope.popover = null;
        PopoverRegistry.remove($scope.options.popoverId);
      }

      /**
       * Positions the popover
       * @param  {object} triggerElement
       * @param  {object} popover
       * @param  {object} options
       */
      function positionPopover(triggerElement, popover, options) {
        $timeout(() => {
          const elDimensions = triggerElement[0].getBoundingClientRect();
          const popoverDimensions = popover[0].getBoundingClientRect();

          let top;
          let left;

          if (options.placement === POSITION.RIGHT) {
            left = elDimensions.left + elDimensions.width + options.spacing;
            top = calculateVerticalAlignment();
          } else if (options.placement === POSITION.LEFT) {
            left = elDimensions.left - popoverDimensions.width - options.spacing;
            top = calculateVerticalAlignment();
          } else if (options.placement === POSITION.TOP) {
            top = elDimensions.top - popoverDimensions.height - options.spacing;
            left = calculateHorizontalAlignment();
          } else if (options.placement === POSITION.BOTTOM) {
            top = elDimensions.top + elDimensions.height + options.spacing;
            left = calculateHorizontalAlignment();
          }

          function calculateVerticalAlignment() {
            return PositionHelper.calculateVerticalAlignment(elDimensions,
              popoverDimensions, options.alignment);
          }

          function calculateHorizontalAlignment() {
            return PositionHelper.calculateHorizontalAlignment(elDimensions,
              popoverDimensions, options.alignment);
          }

          popover.css({
            top: `${top}px`,
            left: `${left}px`,
            height: '300px',
          });

          if ($scope.options.showCaret) {
            addCaret($scope.popover, elDimensions, popoverDimensions);
          }

          $animate.addClass($scope.popover, 'popover-animation');
        }, 50);
      }

      /**
       * Adds a caret and positions it relatively to the popover
       * @param {object} popoverEl
       * @param {object} elDimensions
       * @param {object} popoverDimensions
       */
      function addCaret(popoverEl, elDimensions, popoverDimensions) {
        const caret = angular.element(`<span class="popover-caret caret-${$scope.options.placement}"></span>`);
        popoverEl.append(caret);
        const caretDimensions = caret[0].getBoundingClientRect();

        let left;
        let top;

        if ($scope.options.placement === POSITION.RIGHT) {
          left = -6;
          top = calculateVerticalCaret();
        } else if ($scope.options.placement === POSITION.LEFT) {
          left = popoverDimensions.width - 2;
          top = calculateVerticalCaret();
        } else if ($scope.options.placement === POSITION.TOP) {
          top = popoverDimensions.height - 5;
          left = calculateHorizontalCaret();
        } else if ($scope.options.placement === POSITION.BOTTOM) {
          top = -8;
          left = calculateHorizontalCaret();
        }

        function calculateVerticalCaret() {
          return PositionHelper.calculateVerticalCaret(elDimensions,
            popoverDimensions, caretDimensions, $scope.options.alignment);
        }

        function calculateHorizontalCaret() {
          return PositionHelper.calculateHorizontalCaret(elDimensions,
            popoverDimensions, caretDimensions, $scope.options.alignment);
        }

        caret.css({
          top: `${top}px`,
          left: `${left}px`,
        });
      }
    },
  };
}
