const Producto = require("./base.js");

class ProductoCompuestoArray extends Producto{

    constructor(nombre, propiedades){

        super(nombre || "array");

        this.propiedades = propiedades;
    }

    set(){
        return [];
    }

    __validar(valor){
        let v = this.propiedades["items"].validar(valor);

        if(!v){
            let e = this.propiedades["items"].ultimoError;
    
            this.ultimoError = `[items][${e}]`
        }
    }

    __instancia(){

        let a = [];
 
        return new Proxy(a, {

            get: (A, propiedad)=>{

                if(propiedad["match"] === undefined){
                    return A[propiedad];
                }

                if(propiedad.match(/^\d+$/)){
                    this.setReferer(propiedad);
                }

                return A[propiedad];
            },

            set: (A, item, valor) => {

                this.setReferer();

                if(item.match(/^\d+$/)){
                    this.__setItem(A, item, valor);
                }
                else{
                    A[item] = valor;
                }

                this.unsetReferer();

                return true;

            }

        });       

    }

    __setItem(A, item, valor){

        let v = this.propiedades["items"].validar(valor);

        if(v){
            A[item] = this.propiedades["items"].set(valor);
        }
        else{

            this.ultimoError = `[${item}][${this.propiedades["items"].ultimoError}]`;
            this.error();
        }

    }
    
    
}


module.exports = ProductoCompuestoArray;
