angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http) {
    $scope.app = "Lista telefônica";

    $scope.contatos = []
    var carregarContatos = function() {
        $http.get("http://localhost:8080/angular-js/contatos/").
            success(function(data, status) {
                $scope.contatos = data;
            }).error(function(data) {
                $scope.message = "Aconteceu um erro: " + data;
            });;
    }

    $scope.operadoras = []
    var carregarOperadoras = function() {
        $http.get("http://localhost:8080/angular-js/contatos/operadoras").
            success(function (data) {
                $scope.operadoras = data;
            })
    }

    $scope.adicionarContato = function (contato) {
        $http.post("http://localhost:8080/angular-js/contatos/create", contato).success(function(data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    }

    $scope.apagarContato = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
    };
    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordernarPor = function(campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    carregarContatos();
    carregarOperadoras();
});