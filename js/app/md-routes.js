angular.module("md").config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('login', {
            url: "/",
            templateUrl: "views/login/login.html",
            controller: 'LoginController',
            data: {
                requiredlogin: false,
                requiredGM: false
            }
        })
        .state('home', {
            url: "/home",
            templateUrl: "views/home/home.html",
            controller: 'HomeController',
            data: {
                requiredlogin: true,
                requiredGM: false
            }
        });
});