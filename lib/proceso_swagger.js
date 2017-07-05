const { Proceso } = require("catro-eixos-js");

class ProcesoSwagger extends Proceso{

    constructor(tarea){

        super(tarea);

        if(this.arg("__producto__")){

            this.resultado("__tiene_producto__", true);

            this.refProducto = this.arg("__producto__").getInstancia();

            this.resultado(

                "__producto__", 

                this.refProducto
            );
        }


    }

    enviarRespuesta(){
        this.__cumplida__(this.tarea);
    }

    producto(){
        return this.refProducto;
    }

    errorApi(codigo, mensaje){

        this.resultado("__error__", {codigo, mensaje}); 

        this.error(mensaje);       

    }

 //   setProducto(clave, valor){

 //       this.refProducto.setValor(clave, valor);

 //   }

}

module.exports = ProcesoSwagger;
