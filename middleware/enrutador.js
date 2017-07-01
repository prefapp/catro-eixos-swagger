const debug = require("debug")("catro-eixos-swagger:enrutador");

class Enrutador{

    constructor(controladores, opciones = {}){

        this.controladores = controladores;

        this.debug = debug;

        this.enMock = opciones.enMock || false;
    }

    enrutar(req, res, next){

        let operacion = this.__determinarOperacion(req); 

        this.debug(`En Mock? ${this.enMock ? "Sí": "No"}`);
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

        if(this.enMock) llamada += "_mock";

        this.debug(`Enrutando ${manejador} -> ${llamada}`);

        let operacionId = (manejador) ? manejador + "_" + llamada : req.swagger.operation.operationId;

        this.debug(`Operación ${operacionId}`);

        let controlador = this.controladores[manejador];

        this.debug(`Existe el controlador? ${ (controlador) ? "Sí" : "No" }`);
        this.debug(`Existe el código? ${ (controlador[operacionId]) ? "Sí" : "No" }`);

        if(!controlador){
            
        }
        else{
            return controlador[operacionId](req, res, next)
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
