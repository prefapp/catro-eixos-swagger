
exports.CompuestoMultimedia_compuesto_crear = function(req, res, next) {

    req.refTramitador.tramitar(

        "compuesto_crear", 

        {
            args: req.swagger.params, 

            res: res, 

            swagger: req.swagger.swaggerObject,

            producto: "TareaId"

        }

    );

}

