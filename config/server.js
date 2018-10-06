//requisicoes
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();//inicializa o express
app.set('view engine','ejs');//passa o ejs como views
app.set('views','./app/views');//mostra a rota para views

app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({extended:true}));
//aqui parametrizamos como o bodyParser vai tratar os formularios
//o parametro extend:true vai permitir que seja implementada atráves de json
//as urls codificadas

app.use(expressValidator());

consign()
.include('app/routes')//inclui a pasta das rotas
.then('config/dbConnection.js')//mostra onde está a conexao com o banco
.then('app/controllers')//innclui a pasta dos controllers
.then('app/models') //inclui a pasta dos models
.into(app);
//consign reconhece os arquivos da pasta routes
//modulo e inclui dentro do servidor -app
module.exports = app; // modulo retorna a var app
