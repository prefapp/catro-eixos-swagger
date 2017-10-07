
exports.Hello_hello_get_info = {
    
    producto: "Hello",
    
                
                esDiferida: false,   
                    
}
exports.hello_get = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "version" : "0.0.1"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


