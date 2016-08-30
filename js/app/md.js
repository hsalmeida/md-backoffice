angular.module("md", [
    'ui.router', 'ngResource', 'mongolabResourceHttp', 'ngAnimate', 'ui.bootstrap', 'ngMessages',
    'ngCookies', 'angular.filter', 'angularUtils.directives.dirPagination', 'angularMoment'
])
    .run(function(amMoment) {
        amMoment.changeLocale('pt-br');
    })
    .run(function ($rootScope, $state, $cookies) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            var requireLogin = toState.data.requiredlogin;
            var requireGM = toState.data.requiredGM;
            //ver se esta no cookie
            var angularCookieUsrObj = $cookies.getObject('md-user');
            if (angularCookieUsrObj) {
                $rootScope.currentUser = angularCookieUsrObj;
            }

            if (requireGM && !$rootScope.currentUser.admin) {
                event.preventDefault();
                $state.go('home');
            }

            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                event.preventDefault();
                $state.go('login');
            }

        });
    })
    .constant('MONGOLAB_CONFIG', {API_KEY: 'YXgR-q92vuVCKlSm-ji3nplDTE7rHIQh', DB_NAME: 'md'});
