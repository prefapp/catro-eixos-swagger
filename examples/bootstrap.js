const config = require("config");

const {Tramitador} = require("catro-eixos-swagger"); 

const {init} = require("catro-eixos-js");

module.exports = function(refSwagger){

    return new Promise((cumplida, falla) => {

        init({

            "MiFamiliaProcesos": __dirname + "/ruta_procesos"

        })

        .then(({refProcesador, configuracion}) => {

            new Tramitador(refProcesador, refSwagger)

            cumplida();

        })
        .catch((err) => {

            falla(err);

        })

    });
}

