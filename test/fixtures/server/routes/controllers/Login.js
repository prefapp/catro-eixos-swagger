'use strict';

var utils = require('../utils/writer.js');
var Login = require('../service/LoginService');

module.exports.login_realizar = function login_realizar (req, res, next) {
  var credenciales = req.swagger.params['credenciales'].value;
  Login.login_realizar(credenciales)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
