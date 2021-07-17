
class Despesa{

constructor(ano, mes, dia, tipo, descricao, valor){

this.ano = ano
this.mes = mes
this.dia = dia
this.tipo = tipo
this.descricao = descricao
this.valor = valor

}//fechamento constructor

validarDados(){
	//neste momento estou percorrendo cada um dos elementos contidos dentro de despesa e colocando dentro de i
	for(let i in this){
		
			if(this[i] == undefined || this[i] == null || this[i] == ''){
				return false
			}

		//através do this[i] estou resgatando os valores dos atributos do objeto
	}//fechamento for in
return true

}//fechamento validarDados

}//fechamento class Despesa

class Bd{

	constructor(){
		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id', 0)
		} 
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id')
		//get item vai resgatar o dado dentro do localstorage

		
		return parseInt(proximoId) + 1
	}

	gravar(d){

		let id = this.getProximoId()
		
		localStorage.setItem(id, JSON.stringify(d))
		//aqui eu através do setItem, inserindo estes meus dados colhidos na função no localstorage no próprio browser
		// e convertendo o objeto literal em stringJSON dentro do localstorage

		localStorage.setItem('id', id)
	}


recuperarTodosRegistros(){

//a cada interação do laço for eu vou inserir a despesa já convertida em objeto literal neste array
let despesas = Array() 

	let id = localStorage.getItem('id')
	//aqui eu estou armazenando na variavel id os id's dos itens que estão em localStorage


	//recuperar todas as despesas cadastradas em localStorage pois percorre todos os ids:
	for (let i = 1; i <= id; i++) {
		
		//recuperando a despesa de cada id e convertendo em objetos literais (que antes eram strings json):
		let despesa = JSON.parse(localStorage.getItem(i))


		//esse if vai verificar se existe algum indice que tenha sido pulado ou removido
		//caso tenha, o comando de continue vai fazer o comando de inserir no array ser ignorado
		if (despesa === null) {
			continue
		}

		despesa.id = i
		despesas.push(despesa)
		//estou inserindo a despesa do id atual no array despesas

	}//fechamento do laço for

	return despesas 

}//fechamento recuperarTodosRegistros

	pesquisar(despesa){

			let despesasFiltradas = Array()

			despesasFiltradas =	this.recuperarTodosRegistros()

			console.log(despesa)
			console.log(despesasFiltradas)

			//ano
			if (despesa.ano != '') {
				console.log('filtro de ano')
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
			}//fechamento if teste ano

			//mes
			if (despesa.mes != '') {
				console.log('filtro de mes')
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
			}//fechamento if 

			//dia
			if (despesa.dia != '') {
				console.log('filtro de dia')
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
			}//fechamento if 

			//tipo
			if (despesa.tipo != '') {
				console.log('filtro de tipo')
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
			}//fechamento if 

			//descricao
			if (despesa.descricao != '') {
				console.log('filtro de descricao')
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
			}//fechamento if descricao

			//valor
			if (despesa.valor != '') {
				console.log('filtro de valor')
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
			}//fechamento if valor

			return despesasFiltradas

		}//fechamento pesquisar

		remover(id){
			localStorage.removeItem(id)
		}

}//fechamento class bd

let bd = new Bd

function cadastrarDespesa() {
	
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(

		ano.value, 
		mes.value,
		dia.value, 
		tipo.value, 
		descricao.value, 
		valor.value
		)

	if (despesa.validarDados()) {
	bd.gravar(despesa)
	//verifica se todos os campos foram preenchidos para em seguida gravar os dados
	//console.log('dados válidos')
	$('#erroGravacao').modal('show')
	document.getElementById('botao').className = 'btn btn-lg text-white btn-success'
	document.getElementById('GravacaoMensagem').innerHTML = "Sua despesa foi salva corretamente"
	document.getElementById('titulo').innerHTML = "Sucesso na gravação"
	document.getElementById('botao').innerHTML = "Ok"
	document.getElementById('titulo').className = 'modal-title text-success'

	ano.value=""
	mes.value=""
	dia.value=""
	tipo.value=""
	descricao.value=""
	valor.value=""

}else{
	//erro, não preencheu todos os campos
	$('#erroGravacao').modal('show')
	document.getElementById('botao').className = 'btn btn-lg text-white btn-danger'
	document.getElementById('GravacaoMensagem').innerHTML = "Verifique se todos os campos foram preenchidos corretamente"
	document.getElementById('titulo').innerHTML = "Erro na gravação"
	document.getElementById('botao').innerHTML = "Voltar e corrigir"
	document.getElementById('titulo').className = 'modal-title text-danger'
}


}//fechamento cadastrarDespesa


//essa função é chamada a cada vez que a página de consulta é carregada
function carregaListaDespesas( despesas = Array(), filtro = false) {

	if (despesas.length == 0 && filtro == false) {
	despesas = bd.recuperarTodosRegistros()
	}

	//selecionando o elemento tbody da tabela
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	//percorrer todo o array despesas, listando cada despesa de forma dinamica
	despesas.forEach(function(d){

		console.log(d)

		//criando a linha (tr) o momento que percorro cada item do array
		let linha = listaDespesas.insertRow()

		//criando as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		//linha.insertCell(1).innerHTML = d.tipo

		//é necessário ajustar o tipo pois estava aparecendo como forma numérica:

		switch(d.tipo){

			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}

		linha.insertCell(1).innerHTML = d.tipo//foi feita uma sobreposição com os respectivos tipos 

		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//criando o botão de exclusão

		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class= "fas fa-times"></i>'
		btn.id = `${d.id}`
		btn.onclick = function(){
			//remover a despesa
			let id = this.id

			bd.remover(id)

			window.location.reload()
		}

		linha.insertCell(4).append(btn)//estou acessando linha e inserindo através do insercell 
		//uma nova coluna, em seguida com o append, o elemento botao(btn) que acabou de ser criado.

	})
}//fechamento carregaListaDespesa


function pesquisarDespesa(){

	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)


	carregaListaDespesas(despesas, true)

}//fechamento pesquisarDespesa
