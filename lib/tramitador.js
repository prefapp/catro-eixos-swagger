const CE = require("catro-eixos-js");

const UUIDV4 = require("uuid/v4");

const CrearProductos = require("./producto/constructor.js");

const debug = require("debug")("catro-eixos-swagger:catro-eixos-tramitador");

const initJobs = require("catro-eixos-jobs").init;

const TramitadorJobs = require("./tramitador_jobs");

const ERROR_MAX_TAM = 5000;

class Tramitador{

    constructor(procesador, swaggerRef, configuracion = {}){
        
        this.procesador = procesador;
        this.swaggerRef = swaggerRef;
        this.debug = debug;
        
        this.configuracion = configuracion;

        this.creadorProductos = new CrearProductos();

        this.crearProductos();

        this.iniciarJobs();
    }

    crearProductos(){

        this.productos = this.creadorProductos.construir(

                this.swaggerRef.definitions

        )

    }

    iniciarJobs(){

        if(!this.configuracion.jobs){
            debug(`Sistema tiene jobs? NO`);
            return;
        }
        else{

            initJobs(this.configuracion.jobs)   

                .then(({driver}) => {

                    this.tramitadorJobs = new TramitadorJobs(

                        driver,

                        this.procesador

                    )                    

                })
                .catch((err) => {

                    throw `[TRAMITADOR_JOBS][${err}]`

                })
        }
                    
    }

    tramitar(proceso, p = {}){

        this.debug(`Procesando ${proceso}`);

        //console.log(JSON.stringify(p.args.path));

        proceso = this.__transformarProceso(proceso);

        let tarea = this.__crearTarea(proceso, p.args, p.producto, p.req.swagger);

        this.debug(`El proceso es diferido? ${(p.esDiferida) ? "sí": "no"}`);

        if(p.esDiferida){
            return this._tramitarComoDiferido(tarea, p);
        }
        else{
            return this._tramitar(tarea, p);
        }

    }

    _tramitarComoDiferido(tarea, p){

        this.tramitadorJobs.tramitarProceso(

            tarea,

            (id) => {

                p.res.setHeader('Content-Type', 'application/json');
                p.res.end(JSON.stringify({jobId: id}));

                debug("ENVIADA RESPUESTA");
            }

        );
    }

    _tramitar(tarea, p){

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

                    p.res.end(JSON.stringify({"error": this.__acortarError(e.mensaje)}));
                }
                else{
                    debug(JSON.stringify(tarea.resultados.error));

                    p.res.statusCode = 500;    
                    p.res.end(JSON.stringify({error: `[ERROR_NO_CONTROLADO]`}));
 //                   p.res.end(JSON.stringify(tarea.resultados.error));
                }

            })
    }

    _tramitarConsultaJob(tarea, p){

        this.tramitadorJobs.consultarJob(tarea.args.id) 

            .then((jobDatos) => {        

                p.res.setHeader("Content-Type", "application/json");

                p.res.statusCode = 200;

                p.res.end(JSON.stringify(jobDatos));

            })
            .catch((err) => {

                p.res.setHeader("Content-Type", "application/json");

                p.res.statusCode = 404;

                p.res.end(JSON.stringify({error: "JOB_NO_ENCONTRADO"}));
            })
    }

    __transformarProceso(p){
        return p;
        //return Transformador(p);
    }

    __crearTarea(proceso, args, producto, swagger){

        args = this.__prepararArgsParaTarea(args);
        
        args.proceso = proceso;
        args.__producto__ = this.productos[producto];

        if(!args.__producto__){
            args.__producto__ = this.__generarProductoAnonimo(
                swagger.operation.responses["200"]
            )
        }

        let tarea = new CE.Tarea(

            UUIDV4(),

            args

        );
 

        if(this.tramitadorJobs){    
            tarea.sys["DRIVER_JOBS"] = this.tramitadorJobs.driver;
        }

        return tarea;
    }

    __prepararArgsParaTarea(args){

        let t_args = {};

        Object.keys(args).forEach((k) => {

            t_args[k] = args[k].value;
        });

        //t_args["swagger_args"] = Object.assign({}, args);

        return t_args;
    }

    __generarProductoAnonimo(producto){

        if(producto && producto.schema)
            return this.creadorProductos.construirAnonimo(producto.schema, this.refSwagger)
        else
            return null;

    }

    __acortarError(error){

      if(error.length > ERROR_MAX_TAM) return error.substring(0, ERROR_MAX_TAM - 3) + "...";
      else return error;
    }

}

module.exports = Tramitador;

