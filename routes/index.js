var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var xa = 0;
var mat = 0;

var Matriz = require('../models/matriz');
var User = require('../models/user');
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');

			var username = req.user.username;
			console.log(username);
			Matriz.getMatrizByUsername(username, function(err, matriz){
				if(matriz != null){
					req.body.habilidade1 = matriz.habilidade1;
					req.body.habilidade2 = matriz.habilidade2;
					req.body.habilidade3 = matriz.habilidade3;
				} else {
					console.log("Nao existe");
				}
	});

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','Voce nao esta logado');
		res.redirect('/users/login');
	}
}

router.post('/save', function(req, res){
	console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
	xa = req.user;
		
	var habilidade1 = req.body.habilidade1;
	var habilidade2 = req.body.habilidade2;
	var habilidade3 = req.body.habilidade3;

	req.checkBody('habilidade1', 'Precisa de um valor').notEmpty();
	req.checkBody('habilidade2', 'Precisa de um valor').notEmpty();
	req.checkBody('habilidade3', 'Precisa de um valor').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('/', {
			errors: errors
		});
	} else {
		req.flash('success_msg','Dados salvos');
		var newMatriz = new Matriz({
			username: xa.username,
			habilidade1:habilidade1,
			habilidade2:habilidade2,
			habilidade3:habilidade3,
			categoria:	xa.categoria
		});

		mat = newMatriz;

		Matriz.createMatriz(newMatriz, function(err, user){
			if(err) throw err;
			// req.flash('success_msg','Dados salvos');
			console.log(JSON.stringify(newMatriz));
		});
	}

	res.redirect('/');
});

router.get('/save', function (req, res) {
	res.redirect('/');
	req.body.habilidade1.value = mat.habilidade1;
});
module.exports = router;