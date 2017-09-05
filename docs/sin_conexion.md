# MiddleWare para procesos sin conexion (fuera de las llamadas REST)

En el caso de querer invocar un proceso directamente, sin pasar por el servidor y una request de tipo REST, se necesita un método alternativo. 

Esto puede suceder en los siguientes casos:

* Invocación de un proceso swagger desde repl
* Invocación de un proceso swagger desde una tarea.js
* Invocación de un proceso swagger desde otro proceso


Para ello, se emplea un middleware distinto que es compatible con el middleware normal de Swagger. 

Este MiddleWare posibilita que los procesos de tipo ProcesoSwagger tengan cargado el producto adecuado, *aún en caso de una llamada que no se ha realizado desde una request de tipo REST*

## Empleo de CatroEixosSwaggerMiddlewareSinConexion

Se aplica en cualquier momento de la carga del proceso 

```js

const {CatroEixosSwaggerMiddlewareSinConexion} = require("catro-eixos-swagger");

CatroEixosSwaggerMiddlewareSinConexion(

    refProcesador,

    {
        controladores: __dirname + "/controladores", //colocar donde tenemos los controladores generados
        swaggerApi: __dirname + "/api/swagger.api", //ruta de la api de swagger
        jobs:{tipo: "memoria"} //se le puede pasar también nuestra configuración de jobs
    }

)
    .then(({refProcesador}) => {

        //continuar con nuestra carga normal
    })


```

### Ejemplo: tarea.js
```js
const {execTarea} = require('catro-eixos-js');
const {CatroEixosSwaggerMiddlewareSinConexion} = require("catro-eixos-swagger");
const init = require("./lib/init.js");

execTarea( function() {

  return init()
  
    .then((procesador, conf) => {
    
      CatroEixosSwaggerMiddlewareSinConexion(procesador,{

        controladores: __dirname + "/routes/controllers" ,
        swaggerApi: __dirname + "/api/swagger.yaml"

      })

      return procesador

    })
});

```


