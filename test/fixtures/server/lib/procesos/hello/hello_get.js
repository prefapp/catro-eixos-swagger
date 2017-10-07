const {ProcesoSwagger} = require("../../../../../../index.js");

module.exports = class extends ProcesoSwagger{
  
  __r(){
    return ["__formatearHello"]
  }

  __formatearHello(){

    this.producto().version = "0.1";

  }


}
