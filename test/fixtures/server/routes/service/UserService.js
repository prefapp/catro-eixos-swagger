
exports.User_jwt_firmar_info = {
    
    producto: "Token",
    
                
                esDiferida: false,   
                    
}
exports.jwt_firmar = function(credenciales) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "asdasdasdf"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


