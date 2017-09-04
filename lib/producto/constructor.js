const path = require("path");

const TIPOS = {

    primitivo: require("./primitivos.js").primitivo,

    array: require("./compuesto_array.js"),
    
    object: require("./compuesto.js"),

    integer: require("./primitivos.js").integer,

    boolean: require("./primitivos.js").boolean,

    number: require("./primitivos.js").number,

    string : require("./primitivos.js").string,
}; 

function _resolverVariador(producto, productos){

    if(producto instanceof TIPOS.array){
        return _resolverProducto(producto, productos);
    }
    else if(producto instanceof TIPOS.object){
        return _resolverProducto(producto, productos);
    }
    else{
        return producto;
    }
}


function _resolverProducto(producto, productos){

    for(let p in producto.propiedades){

        if(typeof producto.propiedades[p] === "function"){

            producto.propiedades[p] = _resolverVariador(

                producto.propiedades[p](productos),

                productos
            );
        }
        else{
            producto.propiedades[p] = _resolverVariador(producto.propiedades[p], productos);
        }
    }

    return producto;
}

function _constructor_variador(propiedades, esquema, nombre){

    if(propiedades["type"]){
        switch(propiedades["type"]){
            case "object":
                return _constructor_objeto(propiedades, esquema, nombre);
                break;
            case "array":
                return _constructor_array(propiedades, esquema, nombre);
                break;
            default:
                return _constructor_primitivo(propiedades, esquema);
        }
    }
    else if(propiedades["$ref"]){
        return _constructor_ref(propiedades, esquema);
    }

}

function _constructor_ref(propiedades, esquema){

    let ref = propiedades["$ref"];

    let entidad = path.basename(ref);

    return (productos) => {
        return productos[entidad];
    }
}

function _constructor_array(propiedades, esquema, nombre = ""){

    let esquemaArray = {};

    esquemaArray["items"] = _constructor_variador(propiedades["items"], esquema); 

    return new TIPOS.array(nombre, esquemaArray);
}

function _constructor_objeto(opciones, esquema, nombre = ""){

    let esquemaObjeto = {};

    let propiedades = opciones.properties;

    for(let p in propiedades){

        esquemaObjeto[p] = _constructor_variador(propiedades[p], esquema, p);

    }

    return new TIPOS.object(nombre, esquemaObjeto);
}

function _constructor_primitivo(propiedades, esquema){

    let t = TIPOS[propiedades.type];

    return new t();
}

class Constructor{

    constructor(){

        this.productos = {};

    }

    construir(esquema){

        for (let producto in esquema){

            this.productos[producto] = _constructor_variador(
                esquema[producto], 
                esquema,
                producto
            );
        }

        for(let producto in this.productos){
            _resolverVariador(this.productos[producto], this.productos);
        }

        return this.productos;
    }

    construirAnonimo(producto, esquema){

        let productoObjeto = _constructor_variador(

            producto,
            esquema,
            "ANONIMO"
        )
       
        _resolverVariador(productoObjeto, this.productos);

        //console.log(productoObjeto);

        return productoObjeto;
    }
    
}

module.exports = Constructor;
