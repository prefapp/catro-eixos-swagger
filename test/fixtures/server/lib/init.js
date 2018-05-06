const {init} = require("catro-eixos-js");


module.exports = function(){

  return init({

    "Hello" : __dirname + "/procesos/hello",
    "TrabajoLento" : __dirname + "/procesos/trabajo_lento",
    "Job" : __dirname + "/procesos/job",
    "JWT": __dirname + "/procesos/jwt",

  }).then((procesador) => {

    return {refProcesador: procesador}

  })

}
