const express = require("express")
const { randomUUID } = require("crypto");
const  fs  = require("fs");

const app = express();
let port = 4002
app.use(express.json())

//usando array em memoria, toda vez que o servidor reiniciar, tudo o que foi inserido dentro dele sera apagado.
let products = [];



/**
 * Body => Sempre que a gente quiser enviar dados para a minha aplicação.
 * Params => /product/4343434343 esse número é um parametro de rota. é um valor que compoe norra url. (urlParams)
 * Query => /product?id=43434343&value455454 tudo o que vem depois do ?, são os valores que passamos pela url url
 */


fs.readFile("products.json", "utf-8", (err, data) => {
    if(err) {
        console.log(err)
    } else {
        products = JSON.parse(data)
    }
})

app.post("/products" , (request, response) => {
    //nome e preço

    //dizendo que o nome e o preço que eu vou receber vai vir do body (postman, isomnia ou qualquer site)
    const {name, price} = request.body;

    //dizendo que o nome e o preço que eu vou receber do body e o id random compoe produto.
    const product = {
        name,
        price,
        id: randomUUID(),
    }

    //inserindo tudo o que vier de product dentro do array.
    products.push(product)

    createProductFile()
    
    return response.json(product)
} )

app.get("/products", (request, response) => {
    return response.json(products)
})

app.get("/products/:id", (request, response) => {
    const {id} = request.params;
    const product = products.find((product) => product.id === id);
    return response.json(product)
})

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    createProductFile

    return  response.json({
        message: "produto alterado com sucesso"
    })
})

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    return response.json({
        message: "produto removido com sucesso"
    })
})

function createProductFile () { 
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if(err) {
        console.log(erro)
    } else {
        console.log("Produto inserido")
    }
}) }

app.listen(port, () => console.log(`Loading on port ${port}`))