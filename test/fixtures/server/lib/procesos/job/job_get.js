const {ProcesoSwagger} = require("../../../../../../index.js");

module.exports = class extends ProcesoSwagger{

  __r(){
    return [
      "__getJob",
      "__formatearJob"
    ]
  }

  __getJob(){

    return this.tarea.sys["DRIVER_JOBS"].getJob(this.arg("id"))

  }

  OK__getJob(j){

      this["job"] = j;

  }

  __formatearJob(){

      let j = this["job"];

      this.producto().id = j.id;
      this.producto().estado = j.meta.status;
      this.producto().hito = j.meta.hito || "";

      this.producto().porcentaje_completado = j.meta.completado;

      if(j.meta.status === "FINISHED"){
          this.producto().finalizado = j.resultados.estado || "";
          this.producto().error = j.resultados.error || "";
          this.producto().porcentaje_completado = 100;
      }   

      delete j.resultados.hito;
      delete j.resultados.porcentaje_completado;
      delete j.resultados.__tiene_producto__;
      delete j.resultados.__producto__;


      this.producto().resultados = j.resultados;
  }

  KO__formatearJob(err){

      this.error(`[FORMATEAR_JOB][${err}]`);
  }


}

