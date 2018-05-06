const ProcesoSwagger = require("./base.js");

const USUARIOS = {

    "frmadem": {

        pass: "123qwe//",
        uuid: "frmadem"

    }


}

module.exports = class extends ProcesoSwagger{
    
    DEPURAR(){
        return true;
    }

    __r(){

        return [
            "__comprobarUsuarioYPassword",
        ]

    }

    __comprobarUsuarioYPassword(){



    }
}
