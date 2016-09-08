angular.module('md').controller('ModalCleanerController', function ($scope, cleaner, Calendars) {
    $scope.cleaner = {};
    $scope.initModalCleaner = function () {
        $scope.cleaner = cleaner;
        var query = {
            "cleaner" : cleaner._id.$oid
        };
        Calendars.query().then(function (calendars) {

        });
    };
});