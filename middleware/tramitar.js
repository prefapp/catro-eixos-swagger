class MiddleWareTramitar{

    constructor(refTramitador){
        this.refTramitador = refTramitador;
    }
 
    aplicar(){

        return (req, res, next) => {

            req.refTramitador = refTramitador;

            next();
        }

    }   
}

module.exports = (refTramitador) => {

    return new MiddleWareTramitar(refTramitador).aplicar();

};