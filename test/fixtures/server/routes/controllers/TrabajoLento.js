'use strict';

var utils = require('../utils/writer.js');
var TrabajoLento = require('../service/TrabajoLentoService');

module.exports.trabajo_lento_get = function trabajo_lento_get (req, res, next) {
  TrabajoLento.trabajo_lento_get()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
