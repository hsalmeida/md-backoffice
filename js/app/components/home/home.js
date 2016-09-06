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
            "address": {},
            "completeAddress" : "",
            "bedrooms": 1,
            "iron": true,
            "cook": true,
            "price": 0,
            "create": {$date : new Date().toISOString},
            "day": {$date : new Date().toISOString},
            "status": "",
            "lastReport" : {$date : new Date().toISOString},
            "cleaners": [],
            "cleanersSent": []
        };

        $scope.setselectedrow = function (index) {
            if ($scope.selectedrow === index) {
                $scope.selectedrow = -1;
            } else {
                $scope.selectedrow = index;
            }
        };

        $scope.getLastReport = function (lastReport) {
            var now = new Date();
            var date = new Date(lastReport);

            var diff = now - date;

            console.log(diff);

            var days= Math.floor(diff / 86400);
            var hours = Math.floor((diff - (days * 86400 ))/3600);
            var minutes = Math.floor((diff - (days * 86400 ) - (hours *3600 ))/60);
            var secs = Math.floor((diff - (days * 86400 ) - (hours *3600 ) - (minutes*60)));

            console.log(days + ' ' + hours + ' ' + minutes + ' ' + secs);
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

                $scope.registered = $filter('filter')(offers, {status : "cadastrada"});
                $scope.rejected = $filter('filter')(offers, {status : "recusada"});

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