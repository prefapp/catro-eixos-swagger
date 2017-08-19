const ProcesoSwagger = require("../../lib/proceso_swagger.js");

class TestProceso extends ProcesoSwagger{

  __r(){

    return ["__asignacionDirecta"]
  }

  __asignacionDirecta(){

    this.asignarProducto({

      id: "foo",

      multimedia: {
        nb_streams: 5,
        format_name: "avi"
      } 

    })

  }
}

module.exports = TestProceso;
