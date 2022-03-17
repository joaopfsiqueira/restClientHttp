const http = require('http');

const port = 4001;

http.createServer((request,response) => {
    response.writeHead(200, { 'Content-Type': 'application/json'});

    if(request.url === "/produto") {
        response.end(JSON.stringify({
            message: "Produtos"
        }))
    } 

    if(request.url === "/usuario") {
        response.end(JSON.stringify({
            message: "Usuarios"
        }))
    } 

    response.end(JSON.stringify({
        message: "Tela inicial"
    }))

}).listen(port, ()=> {console.log(`Servidor está rodando na porta ${port}`)})