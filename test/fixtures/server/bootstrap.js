const {boot} = require("../../../index.js").Bootstrap;

const config = require("config");

const init = require("./lib/init.js");

const fs = require("fs");

boot("Cargado procesador", function(){

    return new Promise((cumplida, falla) =>{

        init({})

            .then(({refProcesador, configuracion}) => {

                this.setProcesador(refProcesador);

                cumplida();
            })
            
            .catch((err) => {

                falla(`[BOOT] ${err}`);
            })
    })
})
