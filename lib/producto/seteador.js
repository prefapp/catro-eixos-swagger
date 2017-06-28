class SeteadorValor{

    setear(objeto, clave, valor, constructores)  {

        if(constructores[clave]){

            objeto[clave] = this.__setearValorCompuesto(

                constructores[clave](),

                valor

            );
        }
        else{
            objeto[clave] = valor;
        }
    
    }

    __setearValorCompuesto(ref, valor){

        if(typeof ref === "object"){

            return this.__setearValorCompuestoObjeto(
                ref,

                valor

            );
        }

    }

    __setearValorCompuestoObjeto(ref, valor){

        if(typeof ref !== typeof valor){
            throw `[SETEAR][TIPO_INVALIDO][Se esperada ${typeof ref}]`
        }

        for(let clave in valor){

            ref[clave] = valor[clave];
        }

        return ref;
    }

}

module.exports = SeteadorValor;
