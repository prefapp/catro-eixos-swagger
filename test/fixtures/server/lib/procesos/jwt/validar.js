const ProcesoSwagger = require("./base.js");

module.exports = class extends ProcesoSwagger{
    
    DEPURAR(){
        return true;
    }

    __r(){

        return [
            "__comprobarJWT",
            "__establecerUsuario"
        ]

    }

    __comprobarJWT(){

        return this.arg("jwt").validar(

            this.arg("token")    

        )


    }

    KO__comprobarJWT(err){

        //devolvemo
        this.errorApi(401, ["NO_AUTORIZADO"]);

    }

    __establecerUsuario(){


    }
    
}
