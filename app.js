
var app = angular.module('appjs',  []);

app.controller('myCtrl', function($scope, $http){

    this.setCurrentDate = function(){

        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.Location).success(function(result) {
            $scope.myLat = result.results[0].geometry.location.lat; //getting the coordinates after calling the google api
            $scope.myLng = result.results[0].geometry.location.lng;
            $scope.myPlace = result.results[0].formatted_address;
            //inserting the coordinates in forecast.io request and getting the date for a particular location.
            $http.jsonp('https://api.forecast.io/forecast/api_key_xyz123/'+$scope.myLat+','+$scope.myLng+'?callback=JSON_CALLBACK').success(function(data) {
                $scope.myDataBank = data;
                $scope.celciusTemp = ($scope.myDataBank.currently.temperature - 32) * (5/9); //converts to celcius
                $scope.returnTemperature = $scope.myDataBank.currently.temperature + " F or " + $scope.celciusTemp.toPrecision(3) + " C";
            });


        });

    }

    this.setCustomDate = function(){

        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.Location).success(function(result) {
            $scope.myLat = result.results[0].geometry.location.lat; //getting the coordinates after calling the google api
            $scope.myLng = result.results[0].geometry.location.lng;

            //inserting the coordinates in forecast.io request and getting the date for a particular location.
            $http.jsonp('https://api.forecast.io/forecast/api_key_xyz123/'+$scope.myLat+','+$scope.myLng +','+ $scope.UserDate +'?callback=JSON_CALLBACK').success(function(data) {
                $scope.myDataBank = data;
            });

        });

    };

});
