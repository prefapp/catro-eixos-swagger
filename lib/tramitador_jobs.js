const {Job} = require("catro-eixos-jobs");

module.exports = class {

    constructor(driver, refProcesador, procesoGetJob){

        this.driver = driver;
        this.refProcesador = refProcesador;
        this.procesoGetJob = procesoGetJob;

    }

    tramitarProceso(tarea, fEnviarIdJob){

        let j = this.__iniciarJob(tarea);

        /*
         * Esto es esencial puesto que no podemos
         * devolver el id del job hasta que no esté
         * almacenado
         */
        j.esperarPorJobAlmacenado()

          .then(() => {

              fEnviarIdJob(j.id);

         }).then(() => {

           return this.refProcesador.ejecutar(

                tarea, 

                {
                    eventos: {

                        INICIO_PROCESADO: () => {
                          j.PROCESANDO();
                        },

                        PORCENTAJE_ACTUALIZADO: (p) => {
                          j.PORCENTAJE(p);
                        },

                        HITO_ACTUALIZADO: (h) => {
                          j.HITO(h)
                        },

                        FIN_PROCESADO: () => {
                          j.FINALIZAR(tarea.resultados.estado);
                          j.desinstalar();
                        }

                    }

                }

            )

        }).then(() => {

            console.log("PROCESADO");
        })

        .catch((err) => {
            console.log(JSON.stringify(err, 0, 3));
        })


    }

    __iniciarJob(tarea){
        
        let j = new Job(tarea.args, tarea.resultados); 
        
        tarea.args = j.args;
        tarea.resultados = j.resultados;                    

        return j;
    }

}
