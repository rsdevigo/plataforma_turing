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
	}
});

var Matriz = module.exports = mongoose.model('Matriz', MatrizSchema);

