/**
 * Created by local-rlong on 27/08/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../angular1_nouislider.ts" />
var mcRemote = angular.module('McRemote', []);
mcRemote.controller('index', ["$http", "$q", "$scope", function ($http, $q, $scope) {
        $scope.sliderValue = 80;
        $scope.noUiSliderConfig = {
            animate: true,
            // start: [50],
            connect: 'lower',
            // connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        };
        $scope.onModelChange = function () {
            console.log("onModelChange: " + $scope.sliderValue);
        };
        // setInterval( () => {
        //
        //     console.log( "interval triggered");
        //     $scope.sliderValue++;
        // }, 1000, 1 );
    }]);
angular1_nouislider.setup(mcRemote);
