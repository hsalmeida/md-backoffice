angular.module('md').controller('HomeController', ['$scope', '$rootScope', '$state', 'Users', '$cookies',
    'Offers', 'Employees',
    function ($scope, $rootScope, $state, Users, $cookies, Offers, Employees) {
        $rootScope.bodybg = {
            background: '#FFFFFF'
        };
        $scope.offers = [];
        $scope.offer = {
            "employer": "",
            "address": "",
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

                angular.forEach(offers, function (offer, offerId){
                    Employees.getById(offer.employer).then(function (employer) {
                        offer.employerDetail = employer;
                    })
                });

                $scope.offers = offers;
            });

            waitingCircular.hide();
        };
    }]);