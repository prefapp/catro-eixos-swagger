# catro-eixos-swagger

## Convención de nombres de procesos

En la definición de la api de swagger, la operationId debe observas las siguientes reglas:

- *[Familia]_[operacion]*



## Uso

```js

const CE = require("catro-eixos-js");
const CESwagger = require("catro-eixos-swagger");

//inicializamos el sistema
let Tramitador;

CE.init({

    "Foo" : __dirname + "/procesos/foo/",

    "Foo2" : __dirname + "/procesos/foo2"

}).then((procesador) => {

    Tramitador = new CESwagger.Tramitador(procesador);

}).catch((err) => {

    throw err;

})

//empleo del sistema

function peticionSwagger(req, res){

    Tramitador.tramitar(

        "Foo.proceso_a",

        req, 

        res
    );

}


```
