// Exemplo de uso de NodeJS

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  const { headers } = req;
  const userAgent = headers['user-agent'];


  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<!DOCTYPE html>');
  res.write('<html><head><meta charset="UTF-8"></head>');
  res.write('<body>Hello World<p>Você está usando: '+userAgent+'</p>');
  res.write('<body>Hello World<p>Você solicitou: '+req.url+'</body></html>');
  res.end();
  
  console.log('Requisição realizada')
});

server.listen(port, hostname, () => {
  console.log("Servidor rodando em http://"+hostname+":"+port+"/");
});
