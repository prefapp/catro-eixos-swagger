const CE = require("catro-eixos-js");

const UUIDV4 = require("uuid/v4");

const CrearProductos = require("./producto/constructor.js");

const debug = require("debug")("catro-eixos-swagger:catro-eixos-tramitador");

class Tramitador{

    constructor(procesador, swaggerRef){
        
        this.procesador = procesador;
        this.swaggerRef = swaggerRef;
        this.debug = debug;

        this.crearProductos();
    }

    crearProductos(){

        this.productos = new CrearProductos()

            .construir(

                this.swaggerRef.definitions

            )

    }

    tramitar(proceso, p = {}){

        this.debug(`Procesando ${proceso}`);

        proceso = this.__transformarProceso(proceso);

        let tarea = this.__crearTarea(proceso, p.args, p.producto);

        this.procesador.ejecutar(tarea)

            .then((tarea) => {

                debug(`Tarea terminada [OK] `);
               
                p.res.setHeader('Content-Type', 'application/json');

                let resultados = tarea.resultados;

                if(tarea.resultados.__tiene_producto__){
                    resultados = resultados.__producto__;
                }

                p.res.end(JSON.stringify(resultados));

            })

            .catch((err) => {
    
                debug(`Tarea terminada [KO] `);
                debug(`[Error]: ${tarea.resultados.error}`);

                p.res.setHeader('Content-Type', 'application/json');
                //new TratarError(tarea, res).tratar();

                if(tarea.resultados.__error__){

                    let e = tarea.resultados.__error__;

                    p.res.statusCode = e.codigo;    

                    p.res.end(e.mensaje);
                }
                else{
                    p.res.end(JSON.stringify(err.resultados.error));
                }

            })

    }

    __transformarProceso(p){
        return p;
        //return Transformador(p);
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

module.exports = Tramitador;

