
var url = require('url');

var CompuestoMultimedia = require('./CompuestoMultimediaService');

module.exports.compuesto_crear = function (req, res, next) {
  CompuestoMultimedia.compuesto_crear(req, res, next);
};

