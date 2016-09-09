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