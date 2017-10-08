'use strict';

var utils = require('../utils/writer.js');
var TrabajoLento = require('../service/TrabajoLentoService');

module.exports.trabajo_lento_get = function trabajo_lento_get (req, res, next) {
  var datos = req.swagger.params['datos'].value;
  TrabajoLento.trabajo_lento_get(datos)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
