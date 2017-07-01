
exports.Tarea_tarea_get = function(req, res, next) {

    req.refTramitador.tramitar(

        "tarea_get", 

        {
            args: req.swagger.params, 

            res: res, 

            swagger: req.swagger.swaggerObject,

            producto: "Tarea"

        }

    );

}

