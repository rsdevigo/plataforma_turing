var mongoose = require('mongoose');

var MatrizSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	habilidade1:{
		type: Number
	},
	habilidade2:{
		type:Number
	},
	habilidade3:{
		type:Number
	},
	categoria:{
		type:String
	}
});

var Matriz = module.exports = mongoose.model('Matriz', MatrizSchema);

module.exports.createMatriz = function(newMatriz, callback){
	  newMatriz.save(callback);
}

module.exports.getMatrizByUsername = function(username, callback){
	var query = {username: username};

	Matriz.findOne(query, callback);
}

module.exports.getMatrizById = function(id, callback){
	Matriz.findById(id, callback);
}
