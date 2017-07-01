const {Proceso, Tarea, init} = require("catro-eixos-js");

const Tramitador = require("./tramitador.js");

const CatroEixosSwaggerMiddleware = require("../middleware/tramitar.js");

let boots = [];

let RefProcesador;

class Bootstrap extends Proceso{

    DEPURAR() {return true}

    parametrosNecesarios(){
        return ["refSwagger"]
    }

    initProcesador(familias, opciones){

        return init(familias, opciones)

            .then((refProcesador) => {

                RefProcesador = refProcesador;

            })
    }

    setProcesador(refProcesador){

        RefProcesador = refProcesador;
    }

    constructor(tarea){

        super(tarea);

        let _self = Bootstrap;

        boots.forEach((b, i) => {

            _self["__boot_" + i] = () => {

                return b.f();

            }
            _self["OK__boot_" + i] = () => {
                console.log(b.mensaje);
            }
        })

    }

    __r(){

        let p = Object.keys(this).filter((k) => {

            return k.match(/^__boot_\d+/) && 

                typeof this[k] === "function"

        });

        p.push("__start");
        
        return p;
    }

    __start(){

        let procesador = RefProcesador;

        if(!procesador) throw `refProcesador no se ha seteado`;

        this.resultado("tramitador", new Tramitador(

            procesador,

            this.arg("refSwagger")            

        ));
    }    
}

function generarBootStrap(tarea){

    let _self = new Bootstrap(tarea);

    boots.forEach((b, i) => {

        _self["__boot_" + i] = () => {

            let f = b.f.bind(_self);

            return f();

        }
        _self["OK__boot_" + i] = () => {
            console.log(b.mensaje);
        }
    })

    return _self;
}

module.exports = {

    boot : (mensaje, f) => {

        if(typeof f !== "function")
            throw `Se esperaba una funcion ${mensaje}`
        
        boots.push({

            f: f,

            mensaje: mensaje

        })
    },

    start: (refSwagger, opciones, hecho) => {

        let instancia = generarBootStrap(

            new Tarea("bootstrap", {refSwagger: refSwagger})

        );

        instancia.ejecutar()

        .then(({resultados}) => {

            return CatroEixosSwaggerMiddleware(resultados.tramitador, opciones)
            
        })

        .then((middleware) => {

            hecho(middleware);
        })

        .catch((err) => {
            console.log(err);
            process.exit(1);
        })
    }
}
