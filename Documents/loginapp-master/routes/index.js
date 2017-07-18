var express = require('express');
var router = express.Router();
var User = require('../models/user');
var reportTemplate = require('../models/reportTemplate');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/loginapp';

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/templateList', function(req, res, next){
	var templateArray = [];
  	mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('reporttemplates').find();
    cursor.forEach(function(doc, err) {
      if (User._id==this._provider) {
      assert.equal(null, err);
      templateArray.push(doc);
      }
    }, function() {
      db.close();
      res.render('index', {items: templateArray});
    });
  });
});


module.exports = router;