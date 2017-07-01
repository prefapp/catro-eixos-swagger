
var url = require('url');

var FicheroMultimedia = require('./FicheroMultimediaService');

module.exports.cachearFichero = function (req, res, next) {
  FicheroMultimedia.cachearFichero(req, res, next);
};


module.exports.fichero_borrarCache = function (req, res, next) {
  FicheroMultimedia.fichero_borrarCache(req, res, next);
};


module.exports.fichero_get = function (req, res, next) {
  FicheroMultimedia.fichero_get(req, res, next);
};


module.exports.get_todos = function (req, res, next) {
  FicheroMultimedia.get_todos(req, res, next);
};

