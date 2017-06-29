const Producto = require("./base.js");

class ProductoPrimitivo extends Producto{

    set(valor){
        return valor;
    }

}

class ProductoPrimitivoString extends ProductoPrimitivo{

    __validar(valor){

        if(typeof valor !== "string"){

            this.ultimoError = "Se esperaba un string";

            return false;
        }
        return true;
    }

    __instancia(){
        return ""
    }
}

class ProductoPrimitivoBoolean extends ProductoPrimitivo{

    __validar(valor){

        if(typeof valor !== "boolean"){

            this.ultimoError = "Se esperaba un boolean"
    
            return false;
        }

        return true;
    }

    __instancia(){
        return false;
    }
}

class ProductoPrimitivoInteger extends ProductoPrimitivo{

    __validar(valor){
        
        if(!Number.isInteger(valor)){

            this.ultimoError = "Se esperaba un entero";

            return false;
        }

        return true;
    }

    __instancia(){
        return 0;
    }
}

class ProductoPrimitivoNumber extends ProductoPrimitivo{

    __validar(valor){

        if(valor === undefined || valor === null) return false;

        return valor.toString().match(/^[-+]?[0-9]*\.?[0-9]+$/)
    }

    __instancia(){
        return 0.0;
    }
}

module.exports = {

    "integer": ProductoPrimitivoInteger,
    "boolean": ProductoPrimitivoBoolean,
    "number": ProductoPrimitivoNumber,
    "string": ProductoPrimitivoString,
    "primitivo": ProductoPrimitivo,
}




