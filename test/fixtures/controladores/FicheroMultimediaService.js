
exports.FicheroMultimedia_cachearFichero = function(req, res, next) {

    req.refTramitador.tramitar(

        "cachearFichero", 

        {
            args: req.swagger.params, 

            res: res, 

            swagger: req.swagger.swaggerObject,

            producto: "TareaId"

        }

    );

}


exports.FicheroMultimedia_fichero_borrarCache = function(req, res, next) {

    req.refTramitador.tramitar(

        "fichero_borrarCache", 

        {
            args: req.swagger.params, 

            res: res, 

            swagger: req.swagger.swaggerObject,

            producto: "TareaId"

        }

    );

}


exports.FicheroMultimedia_fichero_get = function(req, res, next) {

    req.refTramitador.tramitar(

        "fichero_get", 

        {
            args: req.swagger.params, 

            res: res, 

            swagger: req.swagger.swaggerObject,

            producto: "FicheroMultimedia"

        }

    );

}


exports.FicheroMultimedia_get_todos = function(req, res, next) {

    req.refTramitador.tramitar(

        "get_todos", 

        {
            args: req.swagger.params, 

            res: res, 

            swagger: req.swagger.swaggerObject,

            producto: "FicherosMultimedia"

        }

    );

}

