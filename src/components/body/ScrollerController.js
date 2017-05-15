import { requestAnimFrame } from '../../utils/utils';
import StyleTranslator from './StyleTranslator';

export default class ScrollerController {

    /* @ngInject*/
    constructor($scope, $element) {
        Object.assign(this, {
            $scope,
            $element,
        });

        window.scrllCtrl = this;
    }

    $postLink() {
        const parent = this.$element.parent();
        const ctrl = this;

        let ticking = false;
        let lastScrollY = 0;
        let lastScrollX = 0;

        this.options.internal.styleTranslator =
            new StyleTranslator(this.options.rowHeight);

        this.options.internal.setYOffset = (offsetY) => {
            parent[0].scrollTop = offsetY;
        };

        function update() {
            ctrl.options.internal.offsetY = lastScrollY;
            ctrl.options.internal.offsetX = lastScrollX;
            ctrl.$scope.body.updatePage();

            if (ctrl.options.scrollbarV) {
                ctrl.$scope.body.getRows(true);
            }

            ctrl.options.$outer.$digest();

            ticking = false;
        }

        function requestTick () {
            if (!ticking) {
                requestAnimFrame(update);
                ticking = true;
            }
        }

        parent.on('scroll', function onScroll() {
            lastScrollY = this.scrollTop;
            lastScrollX = this.scrollLeft;

            requestTick();
        });

        this.$scope.$on('$destroy', () => {
            parent.off('scroll');
        });

        this.$scope.scrollerStyles = () => {
            if (this.options.scrollbarV) {
                return {
                    height: `${ctrl.$scope.body.count * this.options.rowHeight}px`,
                };
            }

            return undefined;
        };
    }
}
