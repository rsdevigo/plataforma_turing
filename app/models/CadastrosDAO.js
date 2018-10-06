function CadastrosDAO(connection){
	this._connection = connection;
}

CadastrosDAO.prototype.getCadastros = function(callback){
	this._connection.query('select*from aluno', callback);//retorna essa função pela palavra this
}
CadastrosDAO.prototype.getCadastro = function(id_noticia, callback){
	this._connection.query('select*from aluno where ', callback);//retorna essa função pela palavra this
}
CadastrosDAO.prototype.salvarCadastro = function(noticia,callback){
	this._connection.query('insert into aluno set?',cadastro, callback);//faz a inserção da noticia usando o query e passa a variavel noticia
}
CadastrosDAO.prototype.excluirCadastro = function(id_noticia, callback){
	this._connection.query("delete from aluno where id_aluno="+ id_cadastro.id_cadastro,callback);//exclui a noticia do BD pelo id dela
}

	module.exports = function(){
	return CadastrosDAO;//retorna a classe
}

