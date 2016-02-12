package angular.js.demo

class ContatosController {

    def static operadoras = [
            [nome: 'Oi', codigo: 14, categoria: 'Celular', preco: 2],
            [nome: 'Vivo', codigo: 15, categoria: 'Celular', preco: 3],
            [nome: 'Tim', codigo: 41, categoria: 'Celular', preco: 1],
            [nome: 'GVT', codigo: 25, categoria: 'Fixo', preco: 3],
            [nome: 'Net', codigo: 21, categoria: 'Fixo', preco: 5]
    ]

    def static contatos = [
            [nome: "bruno junqueira", telefone: "9999-2222", cor: 'blue', data: new Date(), operadora: operadoras[0]],
            [nome: "Sandra de jesus", telefone: "9999-3333", cor: 'green', data: new Date(), operadora: operadoras[2]],
            [nome: "Mariana maria das dores de bla", telefone: "9999-9999", cor: 'yellow', data: new Date(), operadora: operadoras[1]]
    ]

    def index() {
        render(contentType: 'text/json') {contatos}
    }

    def create() {
        def contato = request.JSON
        // contato.data = new Date()
        contatos << contato
        redirect(action: "index")
    }

    def operadoras() {
        render(contentType: 'text/json') {operadoras}
    }
}
