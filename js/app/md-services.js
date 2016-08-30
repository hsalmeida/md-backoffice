angular.module("md")
    .factory('Users', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('users');
    })
    .factory('Cleaners', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('cleaners');
    })
    .factory('Employers', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('employers');
    })
    .factory('Offers', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('offers');
    })
    .factory('Rating', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('rating');
    });