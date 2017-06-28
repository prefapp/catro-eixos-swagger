const {Proceso, Tarea} = require("catro-eixos-js");

const fs = require("fs");

class T extends Proceso{

    DEPURAR(){
        return true;
    }

    parametrosNecesarios(){
        return ["seg"]
    }

    __r(){
        return [
            "__stat", 
            "__espera",
            "__crearArchivos",
            "__apuntarResultados"
        ]
    }

    __stat(){

        return new Promise((cumplida, falla) => {

            fs.stat("a.js", (err, stats) => {

                if(err) return falla(err);
                else    return cumplida(stats);
            })

        })
    }

    OK__stat(stat){

        this["stat"] = stat;
    }

    KO__stat(err){
        this.error(`[STAT][${err}]`);
    }

    PRE__espera(){
        return this.arg("seg") * 1000;
    }

    __espera(espera){

        return new Promise((cumplida, falla) => {

            setTimeout(() => {
                cumplida();
            }, espera)

        })

    }

    __crearArchivos(){
        return this.subProceso(
            "KK.a"
        );
    }

    __apuntarResultados(){
        this.resultado("stat", this["stat"]);
    }
}

//    new T(
//    
//        new Tarea("foo", {seg: 2})
//
//    )
//    .ejecutar()
//
//    .then((tarea) => {
//        console.log(tarea.resultados);
//    })
//    .catch((err) => {
//        console.log(err);
//    })

module.exports = T;

