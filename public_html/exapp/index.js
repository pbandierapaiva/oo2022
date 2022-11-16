
var fs = require('fs');
var express = require('express');
var app = express();
var port = 3000



// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('<h1>Alo mundo!<h1>');
});
app.get('/pacientes', function(req, res) {
	fs.readFile("dados.json", "utf8", function(err, data){
    		if(err) {
    			throw err;
    			}
    			
		var dados = JSON.parse(data)    			
		var vet = []
		for (let d in dados['pacientes'] ){
			console.log(dados['pacientes'][d])
			vet.push( dados['pacientes'][d]['id'])
			}
		res.json( vet ); 
		});
	});

app.get('/pacientes/:idp', function(req, res) {
	fs.readFile("dados.json", "utf8", function(err, data){
    		if(err) {
    			throw err;
    			}
    			
		var dados = JSON.parse(data)    			
		res.json( dados['pacientes'][req.params.idp] )  		
  		});
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

