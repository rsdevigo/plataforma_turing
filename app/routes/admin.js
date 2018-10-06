module.exports = function(app){
	app.get('/formulario_cadastro',function(req,res) { 
		app.app.controllers.admin.formulario_cadastro(app,req,res);
	});

	app.post('/cadastros/salvar', function(req,res){
		app.app.controllers.admin.cadastros_salvar(app,req,res);
	});
}
