
exports.Job_job_get_info = {
    
    producto: "Job",
    
                
                esDiferida: false,   
                    
}
exports.job_get = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "estado" : "WAITING|PROCESSING|FINISHED",
  "resultados" : "{}",
  "porcentaje_completado" : 65.333,
  "id" : "asdfasdfa",
  "finalizado" : "OK|KO",
  "error" : "[SEGMENTACION][MEMORIA_INSUFICIENTE]",
  "hito" : "COMPLETANDO_TRABAJO"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


