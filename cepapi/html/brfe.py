from browser import document, html, alert, ajax
import json
 

class Alerta(html.DIV):
        def __init__(self, msg, tit="Atenção"):
                html.DIV.__init__(self, Class="w3-modal", id="caixadialog")
                self.modal = html.DIV(Class="w3-modal-content")
                self.modal <= html.DIV(Class="w3-container w3-blue-grey") <= html.P(tit)
                self.cont = html.DIV(Class="w3-container")
                fecha = html.SPAN("&times", Class="w3-button w3-display-topright")
                fecha.bind("click", self.dismiss)
                self.cont <= fecha
                self.mensagem = html.P(msg)
                self.cont <= self.mensagem
                self <= self.modal <= self.cont
                if "caixadialog" in document:
                    document["caixadialog"].remove()
                document <= self
                self.style.display='block'
        def setmsg      (self, msg):
                self.mensagem.innerHTML = msg
        def dismiss(self,ev=0):
                self.style.display='none'



class EntraTexto(html.P):
	def __init__(self, texto, desabilita=False, idInput=''):
		html.P.__init__(self)
		self.entrada = html.INPUT(Class="w3-input w3-border w3-sand", type="text", id=idInput)
		self <= html.B( html.LABEL( texto, Class="w3-text-green") )		
		self <= self.entrada
		if desabilita: self.desabilitaEntrada()
	def desabilitaEntrada(self):
		self.entrada.disabled = True

class CaixaSelecRua(html.DIV):
	def __init__(self):
		html.DIV.__init__(self, Class="w3-modal", id='caixaSelecRua')
		self.conteudoModal = html.DIV(Class="w3-modal-content")
		
		cabeca = html.HEADER(Class="w3-container w3-teal")
		xis = html.SPAN(Class="w3-button w3-display-topright")
		xis.innerHTML = "&times;"
		xis.bind("click", self.apagaCaixa)
		cabeca <= xis
		cabeca <= html.H2("Selecione rua")
		self.conteudoModal <= cabeca
		self.style.display='block'
		
		self.conteudo = html.DIV(Class="w3-container")
		self.conteudoModal <= self.conteudo
		self <= self.conteudoModal	
		if "caixaSelecRua" in document:
			document["caixaSelecRua"].remove()
		document <= self

	def apagaCaixa(self,ev=''):
		self.style.display='none'


def buscaCep( ev ):
	ajax.get("/cep/%s"%ev.currentTarget.value, oncomplete=procCep )

def procCep(result):
	resp = json.loads(result.text)
	if resp['STATUS'] != "OK":
		document['iRua'].value = ''
		document['iBairro'].value = ''
		document['iCidadeUf'].value = ''
		Alerta("CEP Não encontrado.")
		return
	if len(resp['Dado'])==1:
		document['iRua'].value = resp['Dado'][0]['Rua'].split(' - ')[0]
		document['iBairro'].value = resp['Dado'][0]['Bairro']
		document['iCidadeUf'].value = resp['Dado'][0]['Cidade']
		document['iNum'].focus()
		return

	selecionaRua = CaixaSelecRua()
	lista = html.UL(Class="w3-ul w3-hoverable")
	for endereco in resp['Dado']:
		it = html.LI( endereco["Rua"] + " - " +endereco["Cidade"], value=endereco["CEP"] )
		it.bind("click", selecionouCep) 
		lista <= it
	selecionaRua.conteudo <= lista
	return
    
def selecionouCep(req):
	document['iCep'].value = "%08d"%req.target.value
	document['caixaSelecRua'].apagaCaixa()
	ajax.get("/cep/%08d"%req.target.value, oncomplete=procCep )

fichaCadastro = html.DIV(Class="w3-card-4")
fichaCadastro <= html.DIV(Class="w3-container w3-green") <= html.H2("Registro")

cpoNome = EntraTexto("Nome")
cpoCep = EntraTexto("CEP", idInput='iCep')
cpoCep.entrada.bind("blur",buscaCep)
cpoRua = EntraTexto("Rua", desabilita=True, idInput='iRua')
cpoNum = EntraTexto("Número", idInput='iNum')
cpoBairro = EntraTexto("Bairro", desabilita=True, idInput='iBairro')
cpoCidUf = EntraTexto("Cidade/UF", desabilita=True, idInput='iCidadeUf')

formEntrada = html.FORM(Class="w3-container")
formEntrada <= cpoNome
formEntrada <= cpoCep
formEntrada <= cpoRua
formEntrada <= cpoNum
formEntrada <= cpoBairro
formEntrada <= cpoCidUf

fichaCadastro <= formEntrada
document <= fichaCadastro


entraCep = html.INPUT(id="iEntraCep")
entraCep.bind("blur", buscaCep)

document <= entraCep


