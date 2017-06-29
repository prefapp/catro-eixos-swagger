const Producto = require("./base.js");

class ProductoCompuestoObjeto extends Producto{

    constructor(nombre, propiedades){

        super(nombre);

        this.propiedades = propiedades;
    }

    set(valores){
        return this.__instanciaInicializada(valores);
    }

    __instanciaInicializada(valores){

        let i = this.__instancia();

        for(let p in valores){
            i[p] = valores[p];
        }

        return i;
    }

    __instancia(){

        let o = {};

        for(let p in this.propiedades){
            o[p] = this.propiedades[p].getInstancia();
        }

        return this.__instalarManejadores(o);
    }

    __instalarManejadores(o){

        return new Proxy(o, {

            get:(objeto, clave) => {

                this.setReferer();

                return objeto[clave];
            },

            set: (objeto, clave, valor) => {

                this.setReferer();

                this.__setClave(objeto, clave, valor);

                this.unsetReferer();

                return true;
            }

        });

    }

    __setClave(objeto, clave, valor){

        if(!this.propiedades.hasOwnProperty(clave)){

            this.ultimoError = `[${clave}][CLAVE_NO_EXISTE]`;
        
            this.error();
        }

        if(this.propiedades[clave].validar(valor)){

            objeto[clave] = this.propiedades[clave].set(
                valor
            );
        }
        else{

            this.ultimoError = `[${clave}][${this.propiedades[clave].ultimoError}]`;

            this.error();
        }

    }

    __validar(valor){

        if(typeof valor !== "object") {
         
            this.ultimoError = "No es un objeto";
            
            return false;
        }

        for (let p in valor){

            if(!this.propiedades[p]){

                this.ultimoError = `[${p}][CLAVE_NO_EXISTE]`;

                return false;
            }

            if(!this.propiedades[p].validar(valor[p])){

                let e = this.propiedades[p].ultimoError;

                this.ultimoError = `[${p}][${e}]`;

                return false;
            }
        }
    
        return true;
    }
}

module.exports = ProductoCompuestoObjeto;

