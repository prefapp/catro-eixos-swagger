'use strict';

var utils = require('../utils/writer.js');
var Hello = require('../service/HelloService');

module.exports.hello_get = function hello_get (req, res, next) {
  Hello.hello_get()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
