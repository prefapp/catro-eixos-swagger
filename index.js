module.exports = {

    "tramitador": require("./lib/tramitador.js"),

    "Bootstrap": require("./lib/bootstrap.js"),

    "ProcesoSwagger": require("./lib/proceso_swagger.js"),

    "CatroEixosSwaggerMiddleware": require("./middleware/tramitar.js"),

    "CatroEixosSwaggerMiddlewareSinConexion": require("./middleware/sin_conexion.js"),

    "ClienteSwagger": require("./lib/cliente.js"),

    "CatroEixosSwaggerMiddlewareJWT": require("./lib/jwt.js"),

}
