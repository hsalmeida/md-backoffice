angular.module("md")
    .factory('Users', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('users');
    })
    .factory('Cleaners', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('cleaners');
    })
    .factory('Employees', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('employees');
    })
    .factory('Offers', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('offers');
    })
    .factory('Rating', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('rating');
    });