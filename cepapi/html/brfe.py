from browser import document, html, alert, ajax
import json

def buscaCep( ev ):
    # alert( ev.currentTarget.value )
    ajax.get("/cep/%s"%ev.currentTarget.value, oncomplete=procCep )

def procCep(req):
    resp = json.loads(req.text)
    if resp['STATUS'] != "OK":
        document <= html.P("CEP Não encontrado.")
        return
    lista = html.UL()
    for cep in resp['Dado']:
        li = html.LI(cep['Rua'], value=cep['CEP'], 
            style={'cursor': 'grab'})
        li.bind("click", clicouLi)
        lista <= li 
    document <= lista

def clicouLi(req):
    alert("clicou li")



document <= html.H2("Olá, entre com um CEP:")

entraCep = html.INPUT(id="iEntraCep")
entraCep.bind("blur", buscaCep)

document <= entraCep


