const {ProcesoSwagger} = require("../../../../../../index.js");

module.exports = class extends ProcesoSwagger{

  __r(){
  
    return [
      "__actualizarEstado"
    ]
  
  }

  __actualizarEstado(){

    let v = 0;

    return new Promise((cumplida, falla) => {

      const i = setInterval(() => {

        this.completado(v * 10);

        if(v++ >= 10){
          clearInterval(i);
          cumplida();
        }


      }, 1000)

    })

  }

}
