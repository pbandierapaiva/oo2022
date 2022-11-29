
// alert("Entrou no PROCFORM")
document.getElementById("iCep").addEventListener("blur", buscaCEP);

function buscaCEP() {
    // alert( document.getElementById("iCep").value  )
    const req = new XMLHttpRequest();
    req.addEventListener("load", processaResultado);

    req.open("GET","/cep/"+document.getElementById("iCep").value)
    req.send()
}

function processaResultado() {
    const obj = JSON.parse(this.responseText);
    if( obj["STATUS"] == "OK" ) {
        if( obj["Dado"].length == 1 ) {
            const endereco = obj["Dado"][0]
            document.getElementById("iRua").value = endereco["Rua"]
            document.getElementById("iRua").disabled = true
            document.getElementById("iCidade").value = endereco["Cidade"]
            document.getElementById("iCidade").disabled = true
            document.getElementById("iBairro").value = endereco["Bairro"]
            document.getElementById("iBairro").disabled = true
        }
        else {
            document.getElementById("selecRua").style.display= "block"
            obj["Dado"].forEach( preencheSelect )
        }

    }
    else {
        alert("CEP não encontrado")
        document.getElementById("iCep").focus()
    }
  }

function preencheSelect(item, index) {
    let ael = document.createElement("a");
    ael.innerText = item["Rua"]
    ael.setAttribute("class", "w3-bar-item w3-button")
    document.getElementById("iSelecRua").appendChild(ael)
}

