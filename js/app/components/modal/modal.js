angular.module('md').controller('ModalCleanerController', function ($scope, cleaner, Calendars) {
    $scope.cleaner = {};
    $scope.initModalCleaner = function () {
        $scope.cleaner = cleaner;
        var query = {
            "cleaner" : cleaner._id.$oid
        };
        Calendars.query(query).then(function (calendars) {
            if(calendars.length > 0) {
                cleaner.calendar = calendars[0]
            }
        });

        $scope.ok = function () {
            $scope.$dismiss();
        };
    };
});

angular.module('md').controller('ModalAddCleanerOfferController', function ($scope, Cleaners, Calendars, offer) {
    $scope.cleaners = [];
    $scope.selectedCleaners = [];
    $scope.initAddlCleanerOffer = function () {

        var day = new Date(offer.day.$date);
        var maxDay = new Date(day);
        day.setHours(2);
        maxDay.setHours(20);

        var nin = [];
        for(var i = 0; i < offer.cleanersSent.length; i++) {
            nin.push(offer.cleanersSent[i].oid);
        }

        var query = {
            "cleaner": {
                "$nin" : nin
            },
            "available": {
                "$elemMatch": {
                    "day": {
                        "$gte": {
                            "$date": day
                        },
                        "$lte": {
                            "$date": maxDay
                        }
                    }
                }
            }
        };

        Calendars.query(query).then(function (calendars) {
            console.log(calendars);
        });

        $scope.add = function () {
            $scope.$dismiss();
        };

        $scope.cancel = function () {
            $scope.$dismiss();
        };
    };
});