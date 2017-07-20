const debug = require("debug")("catro-eixos-swagger:tramitador");

const CargadorControladores = require("./cargador.js");

const Enrutador = require("./enrutador.js");

class MiddleWareTramitar{

    constructor(refTramitador, opciones = {}){
        
        this.refTramitador = refTramitador;
        
        this.controladores = opciones.controladores;

        this.enMock = opciones.enMock || false;

        this.enrutador = false;
        
    }

    cargar(){

        return new CargadorControladores(

            this.controladores
        )

                .cargar()

                .then((cargador) => {

                    this.modelosPeticiones = cargador.modelosPeticiones;

                    this.enrutador= new Enrutador(

                        this.modelosPeticiones, 
                        
                        {
                            enMock: this.enMock

                        }
                    );

                    return this;
                
                })
            
    } 

    aplicar(){

        return (req, res, next) => {

            debug(`Enrutando petición`);

            req.refTramitador = this.refTramitador;
        
            return this.enrutar(req, res, next);

        }

    }

    enrutar(req, res, next){

        return this.enrutador.enrutar(req, res, next);
    }   
}

module.exports = (refTramitador, opciones) => {
    return new MiddleWareTramitar(refTramitador, opciones).cargar()
};
