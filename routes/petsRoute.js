var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var shortid= require('mongoose-minid');

mongoose.connect('mongodb://localhost/AiPet');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

	var locationSchema = mongoose.Schema({
		_id: {
			type: shortid,
			len: 5
		},
    	x: String,
    	y: String,
    	date: Date
	});

	var petSchema = mongoose.Schema({
		_id: {
			type: shortid,
			len: 5
		},
	    name: String,
	    type: String,
	    location: [locationSchema],
	    code: String
	});
var pet = mongoose.model('pets', petSchema);

//Add location route
router.post('/addLocation', function(req, res, next) {
	res.end();
	var code = req.body.code;
	var x = req.body.x;
	var y = req.body.y;
	var date = req.body.date;


	pet.findOne({"code": code}, function(err, pets){
		if(err || !pets) return console.error(err);
	  	pets.location.push({
	  		x: x,
	  		y: y,
	  		date: date
	  	});
	  	pets.save(function(err, data){
	  		if(err || !data) return console.error(err);
	  	});
	});


});

//Getting info from the db
router.get('/getPets', function(req,res,next){
	pet.find(function(err, db){
			if(err) return console.error(err);
			res.status(220).json(db);
		});
});

});

module.exports = router;
