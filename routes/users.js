var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var shortid = require('mongoose-minid');

var userSchema = mongoose.Schema({
		_id: {
			type: shortid,
			len: 5
		},
		username: String,
		password: String,
		token: String,
		email: String,
		arduino: String
	});
var user = mongoose.model('users', userSchema);

// User registration route
router.get('/register', function(req,res,next){
	var newUser = new user({
		username: "admin",
		password: "admin",
		token: "gerghfsergrfg452fg",
		email: "scoob@abv.bg",
		arduino: "1111"
	});
	newUser.save();
	res.sendStatus(220);
});

module.exports = router;
