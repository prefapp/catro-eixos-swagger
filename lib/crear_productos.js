const Producto = require("./producto.js");

class CrearProductos{

    constructor(swaggerRef){

        this.swaggerRef = swaggerRef;
        this.productos = {};
        
    }

    crear(){

        this.definiciones = this.swaggerRef.definitions;

        for(let p in this.definiciones){

            this.__crearProducto(p, this.definiciones[p]);

        }

        return this.productos;
    }

    __crearProducto(nombre, opciones){

        this.productos[nombre] = new Producto(

            nombre,

            opciones

        );

    }
}

module.exports = CrearProductos;
