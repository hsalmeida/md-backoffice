angular.module('md').controller('HomeController', ['$scope', '$rootScope', '$state', 'Users', '$cookies',
    'Offers', 'Employers', '$filter', 'Cleaners', '$uibModal',
    function ($scope, $rootScope, $state, Users, $cookies, Offers, Employers, $filter, Cleaners, $uibModal) {
        $rootScope.bodybg = {
            background: '#FFFFFF'
        };
        $scope.offerSummary = {
            "amountAccepted": 0,
            "amountRefused": 0,
            "amountRate": 0,
            "amountCanceled": 0
        };
        $scope.cacheCleaners = [];
        $scope.offers = [];
        $scope.offer = {
            "employer": "",
            "address": {},
            "completeAddress": "",
            "bedrooms": 1,
            "iron": true,
            "cook": true,
            "price": 0,
            "create": {$date: new Date().toISOString},
            "day": {$date: new Date().toISOString},
            "status": "",
            "lastReport": {$date: new Date().toISOString},
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

        function insertCleanerInList(list, cleaner) {
            angular.forEach(list, function (cSent, i) {
                if (cSent.oid === cleaner._id.$oid) {
                    cSent.cleaner = cleaner;
                }
            });
        }

        $scope.initHome = function () {

            waitingCircular.show();

            $scope.predicate = 'day';
            $scope.reverse = false;

            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            Offers.all().then(function (offers) {
                angular.forEach(offers, function (offer, offerId) {
                    Employers.getById(offer.employer).then(function (employer) {
                        offer.employerDetail = employer;
                    });
                    for (var z = 0; z < offer.cleanersSent.length; z++) {
                        var cSent = offer.cleanersSent[z];
                        Cleaners.getById(cSent.oid).then(function (cleaner) {
                            insertCleanerInList(offer.cleanersSent, cleaner);
                        });
                    }
                });

                $scope.registered = $filter('filter')(offers, {status: "cadastrada"});
                $scope.rejected = $filter('filter')(offers, {status: "recusada"});

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

        $scope.cleanerDetail = function (cleaner) {

            $uibModal
                .open({
                    templateUrl: 'views/modal/cleaner-detail.html',
                    controller: 'ModalCleanerController',
                    resolve: {
                        cleaner: function () {
                            return cleaner;
                        }
                    }
                }).result.then(function () {
                }, function () {
                });

        };

        $scope.addCleaners = function (offer) {

            $uibModal
                .open({
                    templateUrl: 'views/modal/add-cleaner-offer.html',
                    controller: 'ModalAddCleanerOfferController',
                    resolve: {
                        offer: function () {
                            return offer;
                        }
                    }
                }).result.then(function () {
                }, function () {
                });

        };
    }]);