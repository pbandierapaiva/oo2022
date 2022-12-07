from browser import document, html, alert, ajax
import json
 
class EntraTexto(html.P):
	def __init__(self, texto, desabilita=False, idInput=''):
		html.P.__init__(self)
		self.entrada = html.INPUT(Class="w3-input w3-border w3-sand", type="text", id=idInput)
		self <= html.B( html.LABEL( texto, Class="w3-text-green") )		
		self <= self.entrada
		if desabilita: self.desabilitaEntrada()
	def desabilitaEntrada(self):
		self.entrada.disabled = True

class CaixaModal(html.DIV):
	def __init__(self, textoCabeca="indefinido", idCaixa=''):
		html.DIV.__init__(self, Class="w3-modal", id=idCaixa)
		self.conteudoModal = html.DIV(Class="w3-modal-content")
		
		cabeca = html.HEADER(Class="w3-container w3-teal")
		xis = html.SPAN(Class="w3-button w3-display-topright")
		xis.innerHTML = "&times;"
		xis.bind("click", self.apagaCaixa)
		cabeca <= xis
		cabeca <= html.H2(textoCabeca)
		self.conteudoModal <= cabeca
		self.style.display='block'
		
		self.conteudo = html.DIV(Class="w3-container")
		self.conteudoModal <= self.conteudo
		self <= self.conteudoModal	
	def apagaCaixa(self,ev=''):
		self.style.display='none'


def buscaCep( ev ):
	ajax.get("/cep/%s"%ev.currentTarget.value, oncomplete=procCep )

def procCep(result):
	resp = json.loads(result.text)
	if resp['STATUS'] != "OK":
		document <= html.P("CEP Não encontrado.")
		return
	if len(resp['Dado'])==1:
		document['iRua'].value = resp['Dado'][0]['Rua']
		document['iBairro'].value = resp['Dado'][0]['Bairro']
		document['iCidadeUf'].value = resp['Dado'][0]['Cidade']
		return

	selecionaRua = CaixaModal("Selecione a rua", idCaixa='caixaSelecRua')
	lista = html.UL(Class="w3-ul w3-hoverable")
	for end in resp['Dado']:
		it = html.LI( end["Rua"] + " - " +end["Cidade"], value=end["CEP"] )
		it.bind("click", selecionouCep) 
		lista <= it
	selecionaRua.conteudo <= lista

	document <= selecionaRua
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
cpoNum = EntraTexto("Número")
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


