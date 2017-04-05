// Copyright (c) 2017 Richard Long
//
// Released under the MIT license ( http://opensource.org/licenses/MIT )
//


declare var noUiSlider: any;

namespace angular1_nouislider {


    export function setup( module: angular.IModule ) {


        module.directive('nouislider', [function () {

            // vvv https://coderwall.com/p/ngisma/safe-apply-in-angular-js
            function safeApply($scope,fn) {
                var phase = $scope.$root.$$phase;
                // console.log( phase );

                if(phase == '$apply' || phase == '$digest') {
                    if(fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    $scope.$apply(fn);
                }
            };
            // ^^^ https://coderwall.com/p/ngisma/safe-apply-in-angular-js

            return {

                link: function (scope, element, attrs, ngModelCtrl) {

                    // console.log( scope );
                    let noUiSliderConfig = scope['noUiSliderConfig'];
                    let sliderValue = scope['ngModel'];

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
                    if( "undefined" == typeof sliderValue ) {
                        sliderValue = noUiSliderConfig.range.min;
                    }

                    noUiSliderConfig.start = sliderValue;

                    noUiSlider.create(element[0], noUiSliderConfig );

                    var slider = element[0]['noUiSlider'];
                    var dragging = false;

                    // var sliderInstance: any = element[0];
                    slider.on('change', function ( values, handle, unencoded, tap, positions ) {

                        // if( dragging ){
                        //     return;
                        // }

                        // redundant update ?
                        if( scope['ngModel'] == unencoded[handle] ) {
                            return;
                        }

                        safeApply( scope, function() {

                            // redundant update ?
                            if( scope['ngModel'] == unencoded[handle] ) {
                                return;
                            }

                            // console.log( arguments);
                            // console.log( sliderValue );
                            // console.log( unencoded[handle] );
                            let value = unencoded[handle];
                            ngModelCtrl.$setViewValue( value ); // http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive
                            // scope['ngModel'] = unencoded[handle];
                            if( 1 == (1+1)) {
                            }
                        });
                    });


                    slider.on('slide', function ( values, handle, unencoded, tap, positions ) {

                        if( dragging ) {
                            return;
                        }

                        // redundant update ?
                        if( scope['ngModel'] == unencoded[handle] ) {
                            return;
                        }

                        safeApply( scope, function() {

                            // redundant update ?
                            if( scope['ngModel'] == unencoded[handle] ) {
                                return;
                            }
                            // console.log( arguments);
                            // console.log( sliderValue );
                            // console.log( unencoded[handle] );
                            let value = unencoded[handle];
                            ngModelCtrl.$setViewValue( value ); // http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive
                            if( 1 == (1+1)) {
                                // scope['ngModel'] = unencoded[handle];
                            }
                        });
                    });

                    slider.on('start', function ( values, handle, unencoded, tap, positions ) {
                        dragging = true;
                        console.log( "dragging = true" );

                    });

                    slider.on('end', function ( values, handle, unencoded, tap, positions ) {
                        dragging = false;
                        // console.log( "dragging = false" );
                        let value = unencoded[handle];
                        ngModelCtrl.$setViewValue( value ); // http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive

                    });


                    scope.$watch( "ngModel", function (newValue, oldValue) {

                            if( dragging ) {

                                return;
                            }

                            // console.log( newValue );
                            slider.set( newValue );
                        }
                    );

                    {

                        let ngMax = scope['ngMax'];
                        if ('undefined' == typeof ngMax ) {

                            console.log( "'undefined' == typeof ngMax" );
                        } else {
                            scope.$watch( "ngMax", function (newValue: string, oldValue) {

                                console.log( newValue );
                                // vvv http://stackoverflow.com/questions/25772170/nouislider-update-range-on-demand
                                noUiSliderConfig.range.max = parseInt(newValue);
                                slider.updateOptions(noUiSliderConfig);
                                // ^^^ http://stackoverflow.com/questions/25772170/nouislider-update-range-on-demand
                            });
                        }
                    }


                },
                require: '^ngModel', // ^ = look on parent, ? = don't raise an error if not found
                restrict: 'A', // A = attribute, E = element, C = class, M = comment
                scope: {
                    // `=`: bind to object passed, `&`: pass method, `@`: store string
                    ngMax: '=?',
                    min: '=?',
                    ngModel: '=',
                    noUiSliderConfig: '=',
                },

            };

        }]);

    }

}