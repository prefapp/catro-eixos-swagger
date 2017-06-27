const CE = require("catro-eixos-js");

const UUIDV4 = require("uuid/v4");

const TratarError = require("./lib/error.js");
const CrearProductos = require("./lib/crear_productos.js");

const Transformador = require("./lib/transformador.js");

class Tramitador{

    constructor(procesador, swaggerRef){
        
        this.procesador = procesador;
        this.swaggerRef = swaggerRef;

        this.crearProductos();
    }

    crearProductos(){

        this.productos = new CrearProductos(

            this.swaggerRef

        ).crear();

        console.log(this.productos);

    }

    tramitar(proceso, p = {}){

        proceso = this.__transformarProceso(proceso);

        let tarea = this.__crearTarea(proceso, p.args, p.producto);

        this.procesador.ejecutar(tarea)

            .then((tarea) => {
                
                p.res.setHeader('Content-Type', 'application/json');

                let resultados = tarea.resultados;

                if(tarea.resultados.__tiene_producto__){
                    resultados = resultados.__producto__.getValores();
                }

                p.res.end(JSON.stringify(resultados));

            })

            .catch((err) => {

                p.res.setHeader('Content-Type', 'application/json');
                //new TratarError(tarea, res).tratar();

                p.res.end();

            })

    }

    __transformarProceso(p){

        return Transformador(p);
    }

    __crearTarea(proceso, args, producto){

        args = this.__prepararArgsParaTarea(args);
        
        args.proceso = proceso;
        args.__producto__ = this.productos[producto];

        return new CE.Tarea(

            UUIDV4(),

            args

        );
        
    }

    __prepararArgsParaTarea(args){

        let t_args = {};

        Object.keys(args).forEach((k) => {

            t_args[k] = args[k].value;
        });

        t_args["swagger_args"] = Object.assign({}, args);

        return t_args;
    }

}

module.exports = {

    "Tramitador": Tramitador,

    "ProcesoSwagger": require("./lib/proceso_swagger.js")

}
