angular.module('md').controller('LoginController', ['$scope', '$rootScope', '$state', 'Users', '$cookies',
    function ($scope, $rootScope, $state, Users, $cookies) {
        $scope.usuario = "";
        $scope.senha = "";
        $scope.errorLogin = "";

        $scope.initLogin = function () {
            var curUsr = $cookies.getObject("md-user");
            if(curUsr) {
                $scope.usuario = curUsr.usuario;
                $scope.senha = curUsr.senha;
            }
        };

        function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            $cookies.putObject("md-user", user);
        }

        $scope.login = function () {
            waitingCircular.show();
            $scope.errorLogin = "";
            var usr = $scope.usuario;
            var pass = $scope.senha;
            if(usr && pass) {
                console.log("go");
                var sql = {
                    "usuario": usr,
                    "senha": pass
                };
                Users.query(sql).then(function (users) {
                    if(users[0]) {
                        var curUsr = users[0];
                        assignCurrentUser(curUsr);
                        curUsr.lastlogin = new Date();
                        curUsr.$saveOrUpdate().then(function () {
                            $state.go('home');
                        });
                    } else {
                        $scope.errorLogin = "Usuário e ou senha inválidos";
                        console.log("no soup for u");
                    }
                });
            } else {
                $scope.errorLogin = "Usuário e ou senha inválidos";
                console.log("no go");
            }
        }
    }]);