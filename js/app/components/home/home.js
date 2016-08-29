angular.module('md').controller('HomeController', ['$scope', '$rootScope', '$state', 'Users', '$cookies',
    'Offers',
    function ($scope, $rootScope, $state, Users, $cookies, Offers) {
        $rootScope.bodybg = {
            background: '#FFFFFF'
        };
        $scope.offers = [];
        $scope.offer = {
            "employer": "",
            "adrress": "",
            "bedrooms": 1,
            "iron": true,
            "cook": true,
            "price": 0,
            "create": new Date(),
            "status" : "",
            "cleaners" : []
        };

        $scope.initHome = function () {

            waitingCircular.show();

            Offers.all().then(function (offers) {
                $scope.offers = offers;
            });

            waitingCircular.hide();
        };
    }]);