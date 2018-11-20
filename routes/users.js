var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Registrar
router.get('/register', function (req, res) {
	res.render('register');
});

// Login
router.get('/login', function (req, res) {
	res.render('login');
});

// Registrar
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var categoria = req.body.categoria;

	// Validação
	req.checkBody('name', 'Precisa ter nome').notEmpty();
	req.checkBody('email', 'Precisa ter email').notEmpty();
	req.checkBody('email', 'Email não é válido').isEmail();
	req.checkBody('username', 'Precisa ter nome de usuário').notEmpty();
	req.checkBody('password', 'Precisa de senha né dã').notEmpty();
	req.checkBody('password', 'Senha muito curta').len(6,45);
	req.checkBody('password2', 'As senhas não conferem').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//verificando se o nome de usuario e o email ja existem
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: name,
						email: email,
						categoria: categoria,
						username: username,
						password: password
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	req.flash('success_msg', 'Você está registrado e já pode logar');
					res.redirect('/users/login');
				}
			});
		});
	}
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Usuário inválido' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Senha inválida' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }, (err, user, info) => {
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
    console.log(`req.user: ${JSON.stringify(req.user)}`);
    req.login(user, (err) => {
			console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
			var xa =	JSON.stringify(req.user);
			console.log(xa);
			
      return res.redirect('/');
		})
  })(req, res, next);
})

// router.post('/login',
// 	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
// 	function (req, res) {
// 		res.redirect('/');
// 	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'Você deslogou com sucesso');

	res.redirect('/users/login');
});


module.exports = router;