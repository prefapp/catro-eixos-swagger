'use strict';

const config = require("config");

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = config.get("Api.port");

// cargamos código específico de catro-eixos-swagger
const Bootstrap = require(__dirname + "/bootstrap.js");
const {start} = require("catro-eixos-swagger").Bootstrap;

// swaggerRouter configuration
let opciones_catro_eixos = {
    //catro-eixos-router
    controladores: path.join(__dirname, './routes/service'), //path a los controladores
    enMock: config.get("Api.en_mock") == "1"? true : false, //colocamos a true para devolver examples
    jobs: config.get('Jobs'),
};

let opciones_router_swagger = {
    // swagger router
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './routes/controllers'),
    useStubs: false,
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);


start(swaggerDoc, opciones_catro_eixos, (catroEixosMiddleware) => {

        // Initialize the Swagger middleware
        swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

            // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
            app.use(middleware.swaggerMetadata());

            // Validate Swagger requests
            app.use(middleware.swaggerValidator());

            //middleware en funcion de si la api esta activa o no
            if(config.get("Api.en_mock") == '1'){
                app.use(middleware.swaggerRouter(opciones_router_swagger));
            }
            else{
                app.use(catroEixosMiddleware.aplicar());
            }

            // Serve the Swagger documents and Swagger UI
            app.use(middleware.swaggerUi());

            // Start the server
            http.createServer(app).listen(serverPort, function () {
              console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
              console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
            });

        });

})
