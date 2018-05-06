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
            "__generarToken"
        ]

    }

    __comprobarUsuarioYPassword(){

        const c = USUARIOS[this.arg("credenciales").usuario];

        if(!c){
            throw `USUARIO_NO_ENCONTRADO`;
        }
        else{
            if(c.pass !== this.arg("credenciales").password){
                throw `PASSWORD_INCORRECTA`;
            }
        }

        this.a("uuid", c.uuid)

    }

    KO__comprobarUsuarioYPassword(){

        return this.errorApi(401, "NO_AUTORIZADO");
    }

    __generarToken(){

        return this.getJWT().firmar({

            uuid: this.a("uuid")

        }).then((token) => {

            this.producto().token = token;
        })


    }
}
