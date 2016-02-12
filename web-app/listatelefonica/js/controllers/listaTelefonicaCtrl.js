angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI) {

    $scope.app = "Lista telefônica";
    $scope.contatos = []
    $scope.operadoras = []
    $scope.contato = {
        data: 351572400000
    }

    var carregarContatos = function() {
        contatosAPI.getContatos().
            success(function(data, status) {
                $scope.contatos = data;
            }).error(function(data) {
                $scope.error = "Não foi possível carregar os dados!!!";
            });
    }

    var carregarOperadoras = function() {
        operadorasAPI.getOperadoras().
            success(function (data) {
                $scope.operadoras = data;
            })
    }

    $scope.adicionarContato = function (contato) {
        contato.serial = "";
        contato.data = new Date();
        contatosAPI.saveContato(contato).success(function(data) {
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