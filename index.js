const CE = require("catro-eixos-js");

const UUIDV4 = require("uuid/v4");

class Tramitador{

    constructor(procesador){
        
        this.procesador = procesador;
    }

    tramitar(proceso, req, res, next){

        let tarea = this.__crearTarea(proceso, req.swagger.params);

        this.procesador.ejecutar(tarea)

            .then((tarea) => {

                res.json(tarea.resultados);

            })

            .catch((err) => {

                res.json(tarea.resultados);

            })

    }

    __crearTarea(proceso, args){

        args.proceso

        return new CE.Tarea(

            UUIDV4(),

            args

        );
        
    }
}


module.exports = Tramitador;
