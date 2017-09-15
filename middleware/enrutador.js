const debug = require("debug")("catro-eixos-swagger:enrutador");

class Enrutador{

    constructor(modelosPeticiones, opciones = {}){

        this.modelosPeticiones = modelosPeticiones;

        this.debug = debug;

        this.cors = opciones.cors || false;
    }

    enrutar(req, res, next){

        let operacion = this.__determinarOperacion(req); 

        if(this.cors){
          res.setHeader("Access-Control-Allow-Origin", "*");
        }

        if(req.method == "OPTIONS"){
          if(this.cors){
            res.setHeader("Access-Control-Allow-Headers", "X-Api-Key,Content-Type");
            res.statusCode = 200;
            res.end();
            return;
          }
        }

        this.debug(`${req.method} -> ${req.url}`);
        this.debug(`Se va a procesar? ${operacion ? "si": "no"}`);

        if(!req.swagger) return next();

        if(!operacion)
            return this.__sinOperacion(req, res, next);
        else
            return this.__enrutar(req, res, next, operacion)

    }

    __enrutar(req, res, next, operacion){

        let manejador = this.__determinarManejador(req);
        let llamada = this.__determinarLlamada(req);

        this.debug(`Enrutando ${manejador} -> ${llamada}`);

        const modelo = this.modelosPeticiones[manejador + "Service"];

        if(!modelo){
            console.log(modelo);   
        }
        else{

            const info = modelo[manejador + "_" + llamada];

            return req.refTramitador.tramitar(

                `${manejador}.${llamada}`,

                {
                    args: req.swagger.params,
                    req: req,
                    res: res,
                    swagger: req.swagger.swaggerObject,
                    producto: info.producto,
                    esDiferida: info.esDiferida
                }
            )
        }

    }
        __determinarManejador(req){

            return req.swagger.operation['x-swagger-router-controller'] || 
                req.swagger.path['x-swagger-router-controller']
        }

        __determinarLlamada(req){

            return req.swagger.operation.operationId ? 
                req.swagger.operation.operationId : req.method.toLowerCase();
        }

    __sinOperacion(req, res, next){

        let err = new Error(`Ruta definida en swagger pero no hay operación`);

        let permitidos;

        if(req.swagger && req.swagger.api)
            permitidos = this.__listarOperaciones(req);
        else
            permitidos = [];

        res.setHeader('Allow', permitidos.sort().join(', '));
        res.statusCode = 405;

        return next(err);

    }

    __determinarOperacion(req){

        return req.swagger && req.swagger.operation;
    }

    __listarOperaciones(req){

        let metodosPermitidos = [];

        req.swagger.api.operations.forEach((o) => {
            metodosPermitidos.push(o.method.toUpperCase());
        })

        return metodosPermitidos;
    }
    
}

module.exports = Enrutador;
