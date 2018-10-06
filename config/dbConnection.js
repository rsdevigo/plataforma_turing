var mysql = require('mysql');//requisição do módulo mysql

var connMySQL = function(){//variavel que contem a conexão com o banco
	console.log('Conexão com bd foi estabelecida');
		return mysql.createConnection({
			host:'localhost', //servidor
			user:'root', //usuario
			password:'', //senha
			database:'', //qual database acessar
		});
}
module.exports = function(){
	console.log('Banco pronto')
	return connMySQL;//retorna a conexao com o banco
}
