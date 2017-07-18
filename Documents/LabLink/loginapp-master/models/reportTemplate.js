var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var reportTemplateSchema = mongoose.Schema({
	reportName: {
		type: String,
		index: true
	},
	delivery: {
		type: String
	},
	destination: {
		type: String
	},
	paper_saver: {
		type: Boolean
	},
	critical_first: {
		type: Boolean
	},
	abnormal_highlight: {
		type: String
	},
	space_saver: {
		type: Boolean
	},
	repeat_header: {
		type: Boolean
	},
	repeat_collection: {
		type: Boolean
	},

	_provider: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});

var reportTemplate = module.exports = mongoose.model('reportTemplate', reportTemplateSchema);

module.exports.createReportTemplate = function(newReportTemplate, callback){
	        newReportTemplate.save(callback);
				}

module.exports.getReportTemplateByName = function(reportName, callback){
	var query = {reportName: reportName};
	ReportTemplate.findOne(query, callback);
}

module.exports.getReportTemplateById= function(id, callback){
	ReportTemplate.findById(id, callback);
}