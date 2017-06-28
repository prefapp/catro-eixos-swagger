const SeteadorValor = require("./seteador.js");

class ProductoArray{

    constructor(constructorItem){

        this.constructorItem = constructorItem;

    }

    crearInstancia(){

        let a = [];

        return new Proxy([], {

            set: (A, item, valor) => {

                this.__setValor(A, item, valor);

                return true;
            }

        })

    }

    __setValor(a, item, valor){


        let ref = this.constructorItem();

        if(!ref) return a[item] = valor;
 
        return new SeteadorValor()

            .setear(a, item, valor, {i : () => ref})       
        
    }

}

module.exports = ProductoArray;
