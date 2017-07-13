const ProcesoSwagger = require("./proceso_swagger.js");

const {ProcesoConJobsMixin} = require("catro-eixos-jobs");

let DRIVERS= {};

module.exports = ProcesoConJobsMixin(

    class extends ProcesoSwagger{

        ejecutar(){
                
            this.__agregarEvento("INICIO_PROCESADO", () => {
                this.iniciarJob();
            });

            if(this.arg("__diferida__")){
                this.__agregarEvento("INICIO_PROCESADO", () => {
                    this.arg("__diferida__")(this["job"].id)
                })
            }

            return super.ejecutar();
        }

        static setDriverJobs(driver, etiqueta = "default"){
            DRIVERS[etiqueta] = driver;
        }

        static getDriverJobs(driver,etiqueta = "default"){
            return DRIVERS[etiqueta];
        }
    }
)
