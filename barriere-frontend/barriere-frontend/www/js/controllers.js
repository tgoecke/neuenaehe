angular.module('starter.controllers', [])



.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, $location) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.takePicture = function () {

        navigator.camera.getPicture(

            function (imageData) {
                $scope.$apply(function () {
                    $scope.imageSource = "data:image/jpeg;base64," + imageData;
                    getLocation($scope.imageSource);

                });
            },
            function (err) {
                console.log("fail: " + err.code);
            },
            {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions
                //destinationType: Camera.DestinationType.DATA_URL
            }
        );

        function getLocation() {

            var myLatitude = -1;
            var myLongitude = -1;

            navigator.geolocation.getCurrentPosition(function (position) {
                //document.getElementById('pos').innerHTML = 'Latitude1: ' +
                //    position.coords.latitude +
                //    ' / Longitude2: ' +
                //    position.coords.longitude;
                myLatitude = position.coords.latitude;
                myLongitude = position.coords.longitude;
                doPostRequst(myLatitude, myLongitude);
            }, function (data) {
                myLatitude = -2;
                myLongitude = -2;
                doPostRequst(myLatitude, myLongitude);
            });
        }

        function doPostRequst(myLatitude, myLongitude) {

            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            //$httpProvider.defaults.useXDomain = true;
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];

            //$http.post("http://localhost/example.json", imageSource, config)
            //.then(
            //   function (response) {
            //       console.log('Http Post positiv case', $scope.loginData);
            //   },
            //   function (response) {
            //       console.log('Http Post negative case', response);
            //   }
            //);

            var data = {
                image: $scope.imageSource,
                user: "Max Mustermann",
                lat: myLatitude,
                long: myLongitude
            };

            //Call the services

            //$http({
            //    method: 'POST',
            //    url: 'http://XXX:4400/index.html#/app/camera',
            //    data: data
            //}).then(function (response) {
            //    if (response.data)
            //        $scope.msg = "Post Data Submitted Successfully!";
            //}, function (response) {
            //    $scope.msg = "Service not Exists";
            //    $scope.statusval = response.status;
            //    $scope.statustext = response.statusText;
            //    $scope.data = response.data;
            //    $scope.dheaders = response.headers();
            //});

            ////$$absUrl = "http://localhost:4400/index.html#/app/camera"
            //$location.$$absUrl = "http://XXX:4400/index.html#/app/camera";
            //$location.replace();

            var temp2 = $location.absUrl;
            //$http.post(service.host '/api/users/post', JSON.stringify(data)).then(function (response) {
            $http.post('https://api.nutritionix.com/v1_1/search/', JSON.stringify(data)).then(function (response) {
                if (response.data)
                    $scope.msg = "Post Data Submitted Successfully!";
            }, function (response) {
                $scope.msg = "Service not Exists";
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
                $scope.data = response.data;
                $scope.dheaders = response.headers();
            });

            // $http.get("http://localhost/example.json", { params: { "key1": "value1", "key2": "value2" } })
            //.success(function (data) {
            //    $scope.firstname = imageSource;
            //    $scope.lastname = "bla2";
            //})
            //.error(function (data) {
            //    alert("ERROR");
            //});
        }
    };
})




.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('BarrierCtrl', function ($scope) {
    $scope.barriers = [
        { title: 'Barriere erfassen', id: 'entry' },
        { title: 'Barrieren anzeigen', id: 'retrieve' },
        { title: 'Hilfe', id: 'helprequest' }
    ];
})

.controller('BarriersCtrl', function ($scope) {
    $scope.barriers = [
        { title: 'Barriere erfassen', id: 'entry' },
        { title: 'Barriere anzeigen', id: 'retrieve' },
        { title: 'Hilfe', id: 'requestHelp' }
    ];
})
.controller('CameraCtrl', function ($scope) {
    $scope.cameras = [
        { title: 'CameraTitle', id: 1 }
    ];
})

.controller('BarrierCtrl', function ($scope, $stateparam) {
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});
