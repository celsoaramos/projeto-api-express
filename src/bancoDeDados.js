const sequence = {
    _id: 1,
    get id() { 
        return this._id++ 
    }
}

const produtos = {}

function salvarProduto(produto) {
    // se não tiver id setado, chama o get id para adicionar mais um
    if (!produto.id) {
        produto.id = sequence.id
    }
    // adiciona na listsa de produtos
    produtos[produto.id] = produto

    // retorna o produto com a id setada caso nao tenha
    return produto
}

function getProduto(id) {
    // se nao tiver o produto na id, retorna vazio
    return produtos[id] || {}
}

function getProdutos() {
    // retorna todos os produtos
    return Object.values(produtos)
}

function excluirProduto(id) {
    const produto = produtos[id] || {}
    delete produto[id]
    // se nao tiver o produto na id, retorna vazio
    return produto
}

// expõe as 3 funções
module.exports = { salvarProduto, getProduto, getProdutos, excluirProduto }