
const classeInput = "w3-input w3-border w3-sand"

// Alternativa para criação de labels e inputs via JS
let pNome = document.createElement("p")
let labelNome = document.createElement("label")
labelNome.innerHTML = "<b>Nome</b>"
labelNome.className = "w3-text-green"
let inputNome  = document.createElement("input")
inputNome.className = classeInput
inputNome.setAttribute("type","text")
pNome.appendChild(labelNome)
pNome.appendChild(inputNome)
document.getElementById("formContainer").appendChild(pNome)




document.getElementById("iCep").addEventListener("blur", buscaCEP);
// $("#iCep")
// document["iCep"]


function buscaCEP() {    
    document.getElementById("iCep").className = "w3-input w3-border w3-sand"
    const req = new XMLHttpRequest();
    req.addEventListener("load", processaResultado);
    req.open("GET","/cep/"+document.getElementById("iCep").value)
    req.send()
}

function completaZeros(num) {
    return String(num).padStart(8, '0');
  }

function processaResultado() {
    const obj = JSON.parse(this.responseText);
    if( obj["STATUS"] == "OK" ) {
        if( obj["Dado"].length == 1 ) {
            const endereco = obj["Dado"][0]
            document.getElementById("iRua").value = endereco["Rua"].split(" - ")[0]
            document.getElementById("iRua").disabled = true
            document.getElementById("iCidade").value = endereco["Cidade"]
            document.getElementById("iCidade").disabled = true
            document.getElementById("iBairro").value = endereco["Bairro"]
            document.getElementById("iBairro").disabled = true
            document.getElementById("iCep").value = completaZeros(endereco["CEP"])
            document.getElementById("iNum").focus()
        }
        else {
            document.getElementById("modalSelecRua").style.display= "block"
            obj["Dado"].forEach( preencheSelect )
        }
    }
    else {
    	let icep = document.getElementById("iCep")
    	icep.className = "w3-input w3-border w3-red"
    	icep.value=""
        icep.focus()
    }
  }

function preencheSelect(item, index) {
    let ael = document.createElement("li");
    ael.innerText = item["Rua"]
    ael.value= item["CEP"]       
    ael.addEventListener("click", selecionouCEP)
    document.getElementById("ulSelecRua").appendChild(ael)
}

function selecionouCEP() {
    document.getElementById('modalSelecRua').style.display='none'
    document.getElementById("iCep").value = completaZeros(this.value)
    buscaCEP()
}
