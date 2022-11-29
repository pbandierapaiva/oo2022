
// alert("Entrou no PROCFORM")
document.getElementById("iCep").addEventListener("blur", buscaCEP);

function buscaCEP() {    
    document.getElementById('selecRua').style.display='none'
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
            document.getElementById("selecRua").style.display= "block"
            obj["Dado"].forEach( preencheSelect )
        }
    }
    else {
        document.getElementById("iCep").focus()
        // document.getElementById("iCep").
    }
  }

function preencheSelect(item, index) {
    let ael = document.createElement("li");
    ael.innerText = item["Rua"]
    ael.value= completaZeros(item["CEP"])       
    ael.addEventListener("click", selecionouCEP)
    document.getElementById("iSelecRua").appendChild(ael)
}

function selecionouCEP() {
    document.getElementById('selecRua').style.display='none'
    document.getElementById("iCep").value = completaZeros(this.value)
    buscaCEP()
}
