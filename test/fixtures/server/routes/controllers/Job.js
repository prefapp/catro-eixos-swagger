'use strict';

var utils = require('../utils/writer.js');
var Job = require('../service/JobService');

module.exports.job_get = function job_get (req, res, next) {
  var id = req.swagger.params['id'].value;
  Job.job_get(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
