/**
 * Created by local-rlong on 27/08/2016.
 */
var angular1_nouislider;
(function (angular1_nouislider) {
    function setup(module) {
        module.directive('nouislider', [function () {
                // vvv https://coderwall.com/p/ngisma/safe-apply-in-angular-js
                function safeApply($scope, fn) {
                    var phase = $scope.$root.$$phase;
                    // console.log( phase );
                    if (phase == '$apply' || phase == '$digest') {
                        if (fn && (typeof (fn) === 'function')) {
                            fn();
                        }
                    }
                    else {
                        $scope.$apply(fn);
                    }
                }
                ;
                // ^^^ https://coderwall.com/p/ngisma/safe-apply-in-angular-js
                return {
                    link: function (scope, element, attrs, ngModelCtrl) {
                        // console.log( scope );
                        var noUiSliderConfig = scope['noUiSliderConfig'];
                        var sliderValue = scope['ngModel'];
                        // console.log( ngModelCtrl );
                        // ngModelCtrl.$viewChangeListeners.push(function() {
                        //     scope.$eval(attrs.ngChange);
                        // });
                        //
                        // vvv http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive
                        // $scope.updateModel = function(item) {
                        //     ngModelCtrl.$setViewValue(item);
                        // }
                        // ^^^ http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive
                        // console.log( sliderValue  );
                        if ("undefined" == typeof sliderValue) {
                            sliderValue = noUiSliderConfig.range.min;
                        }
                        noUiSliderConfig.start = sliderValue;
                        noUiSlider.create(element[0], noUiSliderConfig);
                        var slider = element[0]['noUiSlider'];
                        var dragging = false;
                        // var sliderInstance: any = element[0];
                        slider.on('change', function (values, handle, unencoded, tap, positions) {
                            // if( dragging ){
                            //     return;
                            // }
                            // redundant update ?
                            if (scope['ngModel'] == unencoded[handle]) {
                                return;
                            }
                            safeApply(scope, function () {
                                // redundant update ?
                                if (scope['ngModel'] == unencoded[handle]) {
                                    return;
                                }
                                // console.log( arguments);
                                // console.log( sliderValue );
                                // console.log( unencoded[handle] );
                                var value = unencoded[handle];
                                ngModelCtrl.$setViewValue(value); // http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive
                                // scope['ngModel'] = unencoded[handle];
                                if (1 == (1 + 1)) {
                                }
                            });
                        });
                        slider.on('slide', function (values, handle, unencoded, tap, positions) {
                            if (dragging) {
                                return;
                            }
                            // redundant update ?
                            if (scope['ngModel'] == unencoded[handle]) {
                                return;
                            }
                            safeApply(scope, function () {
                                // redundant update ?
                                if (scope['ngModel'] == unencoded[handle]) {
                                    return;
                                }
                                // console.log( arguments);
                                // console.log( sliderValue );
                                // console.log( unencoded[handle] );
                                var value = unencoded[handle];
                                ngModelCtrl.$setViewValue(value); // http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive
                                if (1 == (1 + 1)) {
                                }
                            });
                        });
                        slider.on('start', function (values, handle, unencoded, tap, positions) {
                            dragging = true;
                            console.log("dragging = true");
                        });
                        slider.on('end', function (values, handle, unencoded, tap, positions) {
                            dragging = false;
                            // console.log( "dragging = false" );
                            var value = unencoded[handle];
                            ngModelCtrl.$setViewValue(value); // http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive
                        });
                        scope.$watch("ngModel", function (newValue, oldValue) {
                            if (dragging) {
                                return;
                            }
                            // console.log( newValue );
                            slider.set(newValue);
                        });
                    },
                    require: '^ngModel',
                    restrict: 'A',
                    scope: {
                        ngModel: '=',
                        noUiSliderConfig: '='
                    }
                };
            }]);
    }
    angular1_nouislider.setup = setup;
})(angular1_nouislider || (angular1_nouislider = {}));
//# sourceMappingURL=angular1_nouislider.js.map