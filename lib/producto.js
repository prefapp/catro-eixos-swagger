class Producto{

    constructor(nombre, opciones = {}){

        this.nombre = nombre;
        this.opciones = opciones ;
        this.valores = {};
    }

    setValor(clave, valor) {

        if(!this.opciones[clave])
            throw "CLAVE_DESCONOCIDA: " + clave;

        if(!this.__validarValor(valor, this.opciones[clave].tipo)){

            throw "VALOR_INVALIDO " + clave

        }

        this.valores[clave] = valor;
    }

    getValores(){
        return this.valores;
    }

    __validarValor(valor, tipo){

        return true;
    }
    
}

module.exports = Producto;
