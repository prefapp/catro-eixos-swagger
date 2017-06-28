const ProductoCreador = require("./producto/producto_creador.js");

const SeteadorValor = require("./producto/seteador.js");

class Producto{

    constructor(nombre, esquema = {}){

        this.nombre = nombre;
        this.esquema = esquema;
        this.constructores = {};
    }

    crearInstancia(almacenProductos){

        let producto = new ProductoCreador(this.esquema)

                            .crear(

                                almacenProductos,

                                this.constructores

                            );

        return new Proxy(producto, {

            set: (p, clave, valor) => {

                this.__setValor(p, clave, valor);

                return true;
            }
        });
        
    }

    __setValor(p, clave, valor){

        if(!this.__existeClave(clave)){
            throw `[${this.nombre}][clave "${clave}" no existe]`
        }

        if(this.__validar(clave, valor)){

            new SeteadorValor().setear(
        
                p, 

                clave,

                valor,

                this.constructores

            )

        }
        else{
            throw `[${this.nombre}][${clave}][valor incorrecto ${valor}]`
        }

    }

    __existeClave(clave){
        return this.esquema.properties[clave] !== undefined;
    }

    __validar(clave, valor){

        let v = this.__determinarValidador(this.esquema.properties[clave]);

        return this[v](valor, this.esquema.properties[clave]);

    }

    __determinarValidador(esquema){

        let propiedades = esquema;

        if(propiedades.type){
            return "__validador_" + propiedades.type;
        }
        else{
            return "__sin_validar";
        }
    }

    __sin_validar(){
        return true;
    }

    __validador_integer(valor, esquema){

        let propiedades = esquema;

        let formato = propiedades.format;

        return Number.isInteger(valor);
    }
    
    __validador_string(valor){

        return typeof valor === "string";

    }

    __validador_array(valor){
        return Array.isArray(valor);
    }
    __validador_object(valor){
        return typeof valor === "object";
    }
    __validador_boolean(valor){
            return typeof valor === "boolean";
    }
}

module.exports = Producto;
