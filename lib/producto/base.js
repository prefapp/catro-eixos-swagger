let referer = "";

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
    }

    setReferer(predicado){


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
