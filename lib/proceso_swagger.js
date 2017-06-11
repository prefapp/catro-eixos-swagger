const { Proceso } = require("catro-eixos-js");

class ProcesoSwagger extends Proceso{

    constructor(tarea){

        super(tarea);
    
        if(this.arg("__producto__")){

            this.resultado("__tiene_producto__", true);

            this.refProducto = this.arg("__producto__")();

            this.resultado(

                "__producto__", 

                this.refProducto
            );
        }


    }

    setProducto(clave, valor){

        this.refProducto.setValor(clave, valor);

    }

}

module.exports = ProcesoSwagger;
