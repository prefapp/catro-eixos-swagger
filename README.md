# catro-eixos-swagger

Middleware de conexión de una especificación de swagger con catro-eixos-js

## Convención de nombres de procesos para su tramitación

Swagger 2.0 forma el nombre de la operación a tramitar a partir de dos elementos:

- x-swagger-router-controller (relacionado con la tag): nos da el controlador
- operationId: nos da la operación a llamar a nivel del controlador y servicio. 

Por lo tanto, es necesario mapear esto a una familia y un proceso. 

En la especificación a conectar, se deberán definir ambos campos y saber que, a nivel de catro-eixos-js, se va a 
recibir un dato de la forma que sigue: [x-swagger-router-controller -> Familia][operationId -> proceso]

De esta forma, si queremos conectar una peticion GET /v1/recurso/{id}

A nivel de swagger:

```yaml

    paths:
        /recurso/{id}:
            x-swagger-router-controller: Recurso
            operationId: get
        
```

Y a nivel de catro-eixos-js se recibirá una llamada a un proceso *Recurso.get*


## Paso de productos al sistema

Los procesos que deriven de *ProcesoSwagger* tienen la habilidad de acceder al producto que 
se espera que devuelvan de acuerdo a las especificaciones de swagger. 

Los Productos que genera catro-eixos-swagger tienen control de errores y se aseguran que, los valores seteados
por el proceso estén de acuerdo con la especificación;

```js

const {ProcesoSwagger} = require("catro-eixos-swagger");

class MiProceso extends ProcesoSwagger{

    __mi_paso(){

        //aquí puedo acceder al producto
        this.producto().id = "foo";

    }
    
    KO__mi_paso(err){
        //si seteamos un valor incorrecto
        //lo podemos controlar aquí
        // "[Producto][[id][Se esperaba un entero]]"
    }
}

```

## Uso

### Generación de código

Para poner el sistema en marcha es necesario tener un exportador de swagger a controladores. 

Copia la carpeta ~/node_modules/catro-eixos-swagger/plantillas a un punto de tu proyecto (~/plantillas)

```sh
cp -a ./node_modules/catro-eixos-swagger/plantillas ./plantillas
```

Se puede realizar con docker, crea una carpeta bin en el proyecto. Se coloca el siguiente código:

```sh

#!/bin/bash

# evitamos que el generador toque nuestro código de swagger
cp api/swagger.yaml api/swagger.yaml.cp

docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli generate \
    -i /local/api/swagger.yaml \
    -l nodejs-server \
    -t /local/plantillas \
    -o /local/

mv api/swagger.yaml.cp api/swagger.yaml

#mv index.js app.js

```
Ejecutamos este script (desde ~) y el código resultante de generación estará en ~/controllers

### Boostraping

Para arrancar un servidor que sirva nuestra api necesitamos crear un boostrap (~/boostrap.js)

```js
//boostrap.js

const {boot} = require("catro-eixos-js").Bootstrap;

boot("Procesador cargado", () => {

    return this.initProcesador({

        "MiFamiliaProcesos": __dirname + "/procesos"

    })

})

boot("Segunda tarea", () => {


})

boot("Tercera tarea", () => {


})

```

Estas tareas (se pueden poner las que queramos) se ejecutan secuencialmente. 

*Sólo es esencial la primera* (la inicialización del procesador de catro-eixos-js)






