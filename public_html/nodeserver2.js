// Exemplo de uso de NodeJS

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  const { headers, method, url } = req;
  const userAgent = headers['user-agent'];

  const responseBody = { headers, method, url };



  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');

  res.write(JSON.stringify(responseBody));
  
  res.end();
  
  console.log('Requisição realizada')
});

server.listen(port, hostname, () => {
  console.log("Servidor rodando em http://"+hostname+":"+port+"/");
});
