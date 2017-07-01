
var url = require('url');

var Tarea = require('./TareaService');

module.exports.tarea_get = function (req, res, next) {
  Tarea.tarea_get(req, res, next);
};

