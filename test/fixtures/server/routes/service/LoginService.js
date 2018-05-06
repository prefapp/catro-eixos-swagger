
exports.Login_login_realizar_info = {
    
    producto: "Token",
    
                
                esDiferida: false,   
                    
}
exports.login_realizar = function(credenciales) {
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


