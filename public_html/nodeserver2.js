// Exemplo de uso de NodeJS

const http = require('http');

const hostname = '127.0.0.1';
const portaTCP = 3000;

const server = http.createServer((req, res) => {

  const { headers, method, url } = req;
  const userAgent = headers['user-agent'];

  const responseBody = { headers, method, url };

  if (method=='GET') {
  	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
  	if ( url=='/' ) {  
	  	res.write("<h1>Alo mundo!</h1>");
	  	res.end();  
	  	console.log('respondendo GET /')
	  	}
  	else { 
  		res.write("<h1>Alo "+ url +"</h1>");
	  	res.end();  
	  	console.log('respondendo GET /algumacoisa')
	  	}
  	
  	
  	} 
  else {
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'text/json');

	  res.write(JSON.stringify(responseBody));
	  
	  res.end();
	  
	  console.log('Requisição realizada')
	  }
});

server.listen(portaTCP, hostname, () => {
  console.log("Servidor rodando em http://"+hostname+":"+portaTCP+"/");
});





