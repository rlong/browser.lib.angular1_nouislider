// Copyright (c) 2017 Richard Long
//
// Released under the MIT license ( http://opensource.org/licenses/MIT )
//




/// <reference path="../angular1_nouislider.ts" />



var mcRemote= angular.module('Sample', []);



mcRemote.controller('index', ["$http", "$q", "$scope", function ( $http: angular.IHttpService, $q: angular.IQService, $scope) {

    $scope.sliderValue = 80;
    $scope.max = 100;

    $scope.noUiSliderConfig = {
        animate: true,
        // start: [50],
        connect: 'lower',
        // connect: true,
        range: {
            min: 0,
            max: $scope.max
        }
    };

    $scope.onModelChange = function()  {

        console.log( "onModelChange: " + $scope.sliderValue );
    }

    // setInterval( () => {
    //
    //     console.log( "interval triggered");
    //     $scope.sliderValue++;
    // }, 1000, 1 );

}]);



angular1_nouislider.setup( mcRemote );