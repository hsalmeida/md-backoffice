angular.module('md').controller('HomeController', ['$scope', '$rootScope', '$state', 'Users', '$cookies',
    'Offers', 'Employers', '$filter',
    function ($scope, $rootScope, $state, Users, $cookies, Offers, Employers, $filter) {
        $rootScope.bodybg = {
            background: '#FFFFFF'
        };
        $scope.offerSummary = {
            "amountAccepted": 0,
            "amountRefused": 0,
            "amountRate": 0,
            "amountCanceled": 0
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
            "status": "",
            "cleaners": []
        };

        $scope.initHome = function () {

            waitingCircular.show();

            $scope.predicate = 'employer';
            $scope.reverse = false;

            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            Offers.all().then(function (offers) {

                angular.forEach(offers, function (offer, offerId) {
                    Employers.getById(offer.employer).then(function (employer) {
                        offer.employerDetail = employer;
                    })
                });

                var statusList = $filter('countBy')(offers, 'status');
                $scope.offerSummary.amountAccepted = statusList.aceita ? statusList.aceita : 0;
                $scope.offerSummary.amountRefused = statusList.recusada ? statusList.recusada : 0;
                $scope.offerSummary.amountRate = statusList.avaliada ? statusList.avaliada : 0;
                $scope.offerSummary.amountCanceled = statusList.cancelada ? statusList.cancelada : 0;

                $scope.offers = offers;

                waitingCircular.hide();

            }, function () {
                console.log('error');
                waitingCircular.hide();
            });

        };
    }]);