var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var shortid = require('mongoose-minid');
var passport = require('passport');
var passportToken = require('passport-http-bearer').Strategy;
var users = [
    { id: 1, username: 'bob', token: '123456789', email: 'bob@example.com' }
  , { id: 2, username: 'joe', token: 'abcdefghi', email: 'joe@example.com' }
];

function findByToken(token, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.token === token) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

passport.use(new passportToken({
  },
  function(token, done) {
    process.nextTick(function () {
      findByToken(token, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      })
    });
  }
));

	router.get('/', passport.authenticate('bearer', { session: false }), function(req,res,next){
		res.json(req.user);
		console.log(req.body.token);
	});

module.exports = router;