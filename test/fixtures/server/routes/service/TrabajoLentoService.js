
exports.TrabajoLento_trabajo_lento_get_info = {
    
    producto: "JobId",
    
                
                esDiferida: true,    
                    
}
exports.trabajo_lento_get = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "jobId" : "asdfasdfa"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


