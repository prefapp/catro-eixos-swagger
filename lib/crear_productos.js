const Producto = require("./producto.js");

class CrearProductos{

    constructor(swaggerRef){

        this.swaggerRef = swaggerRef;
        this.productos = {};
        
    }

    crear(){

        let definiciones = this.swaggerRef.definitions;

        for(let p in definiciones){

            this.__crearProducto(p, definiciones[p]);

        }

        return this.productos;
    }

    __crearProducto(nombre, opciones){

        let propiedades = this.__getPropiedades(opciones);

        this.productos[nombre] = () => {

            return new Producto(

                nombre,

                propiedades

            );

        }   

    }

    __getPropiedades(o){

        let propiedades = {};

        for(let p in o.properties){

            propiedades[p] = o.properties[p].type;

        }

        return propiedades;
    }
}

module.exports = CrearProductos;
