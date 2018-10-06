module.exports.formulario_cadastro = function(app, req,res){
	//app é a var que contém a instancia do express
	//res a resposta que sera dada pelo server
	//req a requisição que o usuário irá realizar
		res.render("admin/formulario_cadastro",{validacao:{},cadastro:{}});

}
module.exports.cadastros_salvar = function(app,req,res){ //metodo post pegando as noticias,importando a var app que contem as requisições,passando app como parametro
	var cadastro = req.body;

		req.assert('nome','digite um nome').notEmpty();//começa as validacoes

		var erros = req.validationErrors();

		if (erros) {
			res.render("admin/formulario_cadastro",{validacao:erros,cadastro:cadastro});//volta pra pagina de inclusão de noticias
			return; //o return faz com que ele não continue o processo seguinte
		}


		var connection = app.config.dbConnection(); //conexao com o banco
		var cadastrosModel = new app.app.models.CadastrosDAO(connection); //connection da classe

		cadastrosModel.salvarCadastro(cadastro, function(error,result){
			res.redirect('/cadastros'); //chama a pagina noticias
		});

	}
