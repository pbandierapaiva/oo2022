const express = require('express')
const app = express()
const port = 3000

const { exec } = require('child_process');


app.use('/static', express.static('html'))


app.get('/', (req, res) => {
  res.send('API para acesso ao CEP')
})

app.get('/cep/:numero', (req, res) => {

	let resultado = {"STATUS":"Iniciando..."}
	
	if( req.params.numero.length < 5 ) {
		resultado["STATUS"]="ERRO"
		resultado["MENSAGEM"]="Busca de CEP requer ao menos 5 algarismos"
		res.json(resultado)
		return
	}


	strBusca = `grep ^${req.params.numero}   /home/pub/ceps.txt`

	exec( strBusca, (err, stdout, stderr) => {
		console.log("Executando....")
		if (err) {
			console.log(err)
			resultado["STATUS"]="ERRO"
			res.json(resultado)
			return
			}
		
		linhas = stdout.split("\n")
		let listaend = []
		for(let i=0; i< linhas.length-1; i++) {
			let logra = {}
			let partes =linhas[i].split("\t")
			logra["CEP"] = partes[0]
			logra["Cidade"] = partes[1]
			logra["Bairro"] = partes[2]
			logra["Rua"] = partes[3].split(" - ")[0]
			listaend.push( logra )
		}
		resultado["STATUS"]="OK"
		resultado["Dado"] = listaend
		res.json(resultado)
	})
})

app.get('/cep/busca/:nome',  (req, res) => {

	console.log(req.params.nome)
	let resultado = {"STATUS":"Iniciando..."}
	
	strBusca = `grep -i ${req.params.nome}   /home/pub/ceps.txt`

	exec( strBusca, (err, stdout, stderr) => {
		console.log("Executando....")
		if (err) {
			console.log(err)
			resultado["STATUS"]="ERRO"
			res.json(resultado)
			return
			}
		linhas = stdout.split("\n")
		let listaend = []
		for(let i=0; i< linhas.length-1; i++) {
			let logra = {}
			let partes =linhas[i].split("\t")
			logra["CEP"] = partes[0]
			logra["Cidade"] = partes[1]
			logra["Bairro"] = partes[2]
			logra["Rua"] = partes[3].split(" - ")[0]
			listaend.push( logra )
		}
		resultado["STATUS"]="OK"
		resultado["Dado"] = listaend
		res.json(resultado)
	})
})


app.listen(port, () => {
  console.log(`Aceitando requisições na porta ${port}`)
})
