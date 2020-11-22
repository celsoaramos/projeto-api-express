// porta
const porta = 3003

// carrega o express
const express = require('express')

// executa o express e aloca em app
const app = express()

// recupera o "banco de dados"
const bancoDeDados = require('./bancoDeDados')

// importa o body-parser para fazer o parse correto no body em funções post
const bodyParser = require('body-parser')
// qualquer requisição que fizermos vai passar por esse middleware
// isso acontece porque estamos enviando através do x-www-form-urlencoded
// se enviarmos através do body passando JSON não seria necessário !
app.use(bodyParser.urlencoded({ extended: true }))


// vai chamar esse método e dps o próximo get /produtos 
// isso por causa do next
app.get('/produtos', (req, res, next) => {
    console.log("Middleware 1..")
    next()
})

// cria um método get com a url /produtos
// esse método get responderá { nome: 'Notebook', preco: 123.45 } no formato JSON
app.get('/produtos', (req, res, next) => {
    // converte para JSON
    res.send(bancoDeDados.getProdutos())
})

// o next poderia apagar já que não está sendo usasda
app.get('/produtos/:id', (req, res, next) => {
    // converte para JSON
    // recupera o id do parâmetro que veio da requisição 
    res.send(bancoDeDados.getProduto(req.params.id))
})

app.post('/produtos/', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto)
})

app.put('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto)
})

app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.excluirProduto(req.params.id)
    res.send(produto)
})

// dessa forma QUALQUER URL vai funcionar http://localhost:3003/uauidiahdahis
// app.use((req, res, next) => {
//     // converte para JSON
//     res.send({ nome: 'Notebook', preco: 123.45 })
// })


// qual porta vai ficar escutando
app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})