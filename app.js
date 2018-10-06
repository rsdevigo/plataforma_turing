var app = require('./config/server');//importando em uma variavel as informações do server

app.listen(3000, function(){
	console.log('LIGOU');//mensagem de resposta caso ligue
});
