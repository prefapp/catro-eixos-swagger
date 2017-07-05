const debug = require("debug")("catro-eixos-swagger:producto");

let referer = "";
let ultimoPredicado = "";

class Producto{
    
    constructor(nombre){
        this.nombre = nombre;
        this.ultimoError = "";
        this.referer = "";
    }

    getInstancia(){
        return this.__instancia();
    }

    validar(valor){
        return this.__validar(valor);
    }

    unsetReferer(){

        referer = "";
        ultimoPredicado = "";

        //debug(`Unsetting referer = ${referer}`);
    }

    setReferer(predicado){

        if(ultimoPredicado === predicado) return;

        if(predicado){
            referer = `${referer} -> ${predicado}`;
        }
        else{

            if(referer === ""){
                referer = this.nombre;
            }
            else{
                referer = `${referer} -> ${this.nombre}`;
            }   
        }

        ultimoPredicado = predicado;
    }

    set(){
        throw "ABSTRACTO!!!"
    }

    error(){

        let r = referer;

        this.unsetReferer();

        throw `[${r}][${this.ultimoError}]`
    }

}

module.exports = Producto;
