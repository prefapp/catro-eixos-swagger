const { Proceso } = require("catro-eixos-js");

class ProcesoSwagger extends Proceso{

    static setRefDriverJobs(refDriverJobs){

      this.REF_DRIVER_JOBS = refDriverJobs;

    }

    static getRefDriverJobs(){

      return this.REF_DRIVER_JOBS;

    }

    static setRefProductosSwagger(refProcesosProductos){

      this.refProcesosProductos = refProcesosProductos;

    }

    static getProductoProceso(nombreProceso){

      if(!this.refProcesosProductos) return {};

      if(!this.refProcesosProductos[nombreProceso]) return '__SIN_PRODUCTO__';

      return this.refProcesosProductos[nombreProceso].getInstancia();

    }

    static SET_JWT(jwt){

        this.JWT = jwt;

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

          this.tarea.sys["DRIVER_JOBS"] = ProcesoSwagger.getRefDriverJobs();

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

    setCabecera(clave, valor){

        this.arg("req").params["clave"] = valor;

    }

    getJWT(){

      if(!this.constructor.JWT)
        throw `ERROR_SWAGGER: el middleware de JWT no está establecido`;

      return this.constructor.JWT;

    }

}

module.exports = ProcesoSwagger;
