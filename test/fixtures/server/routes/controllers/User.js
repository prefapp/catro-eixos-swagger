'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.jwt_firmar = function jwt_firmar (req, res, next) {
  var credenciales = req.swagger.params['credenciales'].value;
  User.jwt_firmar(credenciales)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
