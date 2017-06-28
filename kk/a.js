const {Proceso, Tarea} = require("catro-eixos-js");

const fs = require("fs");

class T extends Proceso{

    __r(){
        return ["__find"]
    }

    __find(){

        let promesas = ["a", "b", "c", "d"].map(
            (f) => this.comandoShell("/abin/touch", ["/tmp/"+ f])
        )

        return Promise.all(promesas);
    }

    OK__find(respuesta){


        console.log(respuesta);
    }

    KO__find(err){
        this.error(`[FIND][${err}]`);
    }

}

module.exports = T;

