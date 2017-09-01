const { Proceso } = require("catro-eixos-js");

class ProcesoSwagger extends Proceso{

    static setRefProductosSwagger(refProcesosProductos){

      this.refProcesosProductos = refProcesosProductos;

    }

    static getProductoProceso(nombreProceso){

      if(!this.refProcesosProductos) return {};

      return this.refProcesosProductos[nombreProceso].getInstancia();

    }

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
        else{ 

          //no se ha inicializado el proceso desde el middleware de swagger
    
          this.refProducto = ProcesoSwagger.getProductoProceso(

            this.arg("proceso")

          ); 
       
          //conectamos el "producto" a los resultados
          this.resultado("__producto__", this.refProducto)

        }


    }

    enviarRespuesta(){
        this.__cumplida__(this.tarea);
    }

    producto(){
        return this.refProducto;
    }

    asignarProducto(producto){

      if(Array.isArray(producto)){
        producto.forEach(e => this.producto().push(e))
      }
      else{
        Object.keys(producto).forEach((k) => {
            this.producto()[k] = producto[k];
        })
      }

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
