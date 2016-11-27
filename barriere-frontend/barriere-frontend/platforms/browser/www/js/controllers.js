angular.module('starter.controllers', [])



.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, $ionicHistory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.takePicture = function () {

        navigator.camera.getPicture(

            function (imageData) {
                $scope.$apply(function () {
                    $scope.imageSource = "data:image/jpeg;base64," + imageData;
                });
            },
            function (err) {
                console.log("fail: " + err.code);
            },
            {
                quality:50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetHeight: 100,
                targetWidth : 100
            }
        )}

    $scope.sendBarrier = function() {

        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude

                sendToBackend($http, $ionicHistory, lat, long, $scope.imageSource)
            },
            function(err) {
                // error
                console.error('Geolocation not available: ' + err)
            },
            posOptions);
    }

})

.controller('BarrierCtrl', function ($scope) {
    $scope.barriers = [
        { title: 'Barriere erfassen', id: 'entry' },
        { title: 'Barrieren anzeigen', id: 'retrieve' },
        { title: 'Hilfe', id: 'helprequest' }
    ];
})
.controller('CameraCtrl', function ($scope, $http) {
    

    
})


function sendToBackend(http, ionicHistory, lat, long, imgSrc) {
    var params = {
        "img": imgSrc,
        "user":"fl3",
        "lat": lat,
        "lng": long
    }

    http.post("http://neuenaehentt.azurewebsites.net/entry", params)
            .success(function(data) {
                console.log('Request sent successfully')

                ionicHistory.goBack(-1);
            })
            .error(function(data) {
                console.error('Error sending request: ' + data)
            });
}
