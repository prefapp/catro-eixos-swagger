# catro-eixos-swagger

Middleware de conexión de una especificación de swagger con catro-eixos-js

## Convención de nombres de procesos

En la definición de la api de swagger, la operationId debe observas las siguientes reglas:

- *[Familia]_[operacion]*

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


```
