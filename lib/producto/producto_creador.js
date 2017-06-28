const path = require("path");

const ProductoArray = require("./producto_array.js");

class ProductoCreador{

    constructor(esquema){
        this.esquema = esquema;
    }

    crear(almacenProductos, constructores = {}){

        this.almacenProductos = almacenProductos;

        return this.__crearInstancia(constructores);

    }

    __crearInstancia(constructores){

        if(this.esquema.type === "object"){
            return this.__crearInstanciaObjeto(constructores);
        }
        else if(this.esquema.type === "array"){
            return this.__crearInstanciaArray(constructores);
        }
        else{
            throw `[CREAR_PRODUCTO][Tipo desconocido: ${this.esquema.type}]`
        }

    }

    __crearInstanciaObjeto(constructores){

        let o = {};
        let propiedades = this.esquema.properties;

        for(let clave in propiedades){

            if(propiedades[clave]["$ref"]){

                constructores[clave] = this.__crearInstanciaSubproducto(

                    propiedades[clave]["$ref"]

                );

                o[clave] = constructores[clave]();

            }
            else if(propiedades[clave].type === "object"){
                o[clave] = {};
            }
            else if(propiedades[clave].type === "array"){

                o[clave] = this.__crearArray(

                    clave,

                    propiedades[clave],

                    constructores

                );
            }
            else if(propiedades[clave].type === "string"){
                o[clave] = "";
            }
        }
        return o;        
    }

    __crearArray(clave, propiedades, constructores){

        if(!propiedades.items) return [];

        if(propiedades.items["$ref"]){

            let subproducto = this.__crearInstanciaSubproducto(

                propiedades.items["$ref"]
            )

            return new ProductoArray(subproducto)
                
                .crearInstancia()
        }
        else{

            return [];
        }
        
    }

    __crearInstanciaSubproducto(ref){

        ref = path.basename(ref);

        return () => {
            return this.almacenProductos[ref].crearInstancia(
                this.almacenProductos
            )
        }
    }
}

module.exports = ProductoCreador;
