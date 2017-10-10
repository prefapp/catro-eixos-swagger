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

        this.completado(v * 1);

        this.resultado('f' + v, v)

        if(v++ >= 100){
          clearInterval(i);
          cumplida();
        }


      }, 100)

    })

  }

}
