var express = require('express');
var router = express.Router();

var User = require('../models/user');
var reportTemplate = require('../models/reportTemplate');

router.get('/templates', function(req, res){
	res.render('templates');
});

//Create Template
router.post('/newTemplate', function(req, res){
	var reportName = req.body.reportName;
	var delivery = req.body.delivery;
	var destination = req.body.destination;
	var paper_saver = req.body.paper_saver;
	var critical_first = req.body.critical_first;
	var abnormal_highlight = req.body.abnormal_highlight;
	var space_saver = req.body.space_saver;
	var repeat_header = req.body.repeat_header;
	var repeat_collection = req.body.repeat_collection;
	var _provider = req.user._id;

	//Validation
	req.checkBody('reportName', 'Report Name is required').notEmpty();
	req.checkBody('delivery', 'Delivery Method is required').notEmpty();
	req.checkBody('destination', 'Report Destination is required').notEmpty();
	req.checkBody('paper_saver', 'Paper Saver preference is required').notEmpty();
	req.checkBody('critical_first', 'Critical First preference is required').notEmpty();
	req.checkBody('abnormal_highlight', 'Abnormal Highlight preference is required').notEmpty();
	req.checkBody('space_saver', 'Space Saver preferenceis required').notEmpty();
	req.checkBody('repeat_header', 'Repeat Header preference is required').notEmpty();
	req.checkBody('repeat_collection', 'Repeat Collection preference is required').notEmpty();

	var errors = req.validationErrors();
		if(errors){
			res.render('/',{
				errors:errors
			});
		} else {
			var newTemplate = new reportTemplate({
				reportName: reportName,
				delivery: delivery,
				destination: destination,
				paper_saver: paper_saver,
				critical_first: critical_first,
				abnormal_highlight: abnormal_highlight,
				space_saver: space_saver,
				repeat_header: repeat_header,
				repeat_collection: repeat_collection,
				_provider: _provider
			});

			//template population
			// reportTemplate.
			// 	findOne({req.reportName}).
			// 	populate(_provider).
			// 	exec(function (err, reportTemplate){
			// 		if (err) return handleError(err);
			// 		console.log(reportTemplate._provider);
			// 	});

			reportTemplate.createReportTemplate(newTemplate, function(err, reportTemplate){
				if(err) throw err;
				console.log(reportTemplate);
			});

			req.flash('success_msg', 'New Report Template added!');

			res.redirect('/');

		}
});

module.exports = router;