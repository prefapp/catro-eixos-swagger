class TratarError{

    constructor(tarea, res){

        this.tarea = tarea;
        this.resultados = tarea.resultados;
        this.res = res;

    }

    tratar(){

        for(var k in this){

            if(k.match(/SONDA__/)){

                if(this[k]()) break;                

            }
        }
        
        this.res.statusMessage = this.resultados.error;
    }

    SONDA__faltanParametros(){

        if(this.resultados.error.match(/FALTA_PARAMETRO/)){

            this.res.statusCode(400);

            return true;
        } 

        return false;
    }

}

module.exports = TratarError;
