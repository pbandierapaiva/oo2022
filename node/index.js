
const express = require('express')
const { exec } = require("child_process");

const app = express()
const port = 3000

app.get('/', (req, res) => {
          res.send('Alo mundo!')
})

app.get('/cep/:num', function(req,res) {

        const grepstr = `grep ^${req.params.num}  /home/pub/ceps.txt`
	
	console.log(grepstr);
	exec(grepstr, (error, stdout, stderr) => {
	    if (error) {
		console.log(`error: ${error.message}`);
		res.json({"ERRO":error.message});
		return;
	    }
	    if (stderr) {
		console.log(`stderr: ${stderr}`);	    
		res.json({"ERRO":stderr});
		return;
	    }
	    
	    let lista = []
	    let l = stdout.split('\n')
	    for (let i = 0; i < l.length-1; i++) {
		lista.push(l[i].split("\t"))
		}
	    console.log(l)
	    console.log(`stdout: ${stdout}`);
	    res.json(lista);
	    return
	});
	res.json({"ERRO":"Não encontrado"});	

	


});

app.listen(port, () => {
          console.log(`Aplicação atendendo na porta: ${port}`)
})


