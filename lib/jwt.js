const JWT = require("jsonwebtoken");

const MAX_VIDA = "20 days"

const ProcesoSwagger = require("./proceso_swagger.js");

module.exports = function ({

    secreto, 
    procesoValidar, 
    maxVida = MAX_VIDA

}){

   const jwtObjeto = new CatroEixosSwaggerJWT(
   
       secreto,
       procesoValidar,
       maxVida

   );

   //damos acceso al JWT de todos los procesos 

   ProcesoSwagger.SET_JWT(jwtObjeto);

   return function(req, securityDefinitions, scopes, callback){

        if(!req.preacciones){
            req.preacciones = [];
        }

        req.preacciones.push({

            proceso: jwtObjeto.procesoValidar,
            args: {
                jwt: jwtObjeto,
                token: scopes
            }

        });

        callback();
   }
        
}

class CatroEixosSwaggerJWT{

    constructor(secreto, procesoValidar, maxVida){

        this.secreto = secreto;
        this.maxVida = maxVida;
        this.procesoValidar = procesoValidar;

    }

    validar(token){

        return new Promise((cumplida, falla) => {

           let descodificado = JWT.verify(token, this.secreto, (err, desc) => {

    
                if(err) return falla(err);
                else    return cumplida(desc);
        
           });

        })

    }

    firmar(payload){

        return Promise.resolve(

            JWT.sign(payload, this.secreto, {

                expiresIn: this.maxVida

            })

        )

    }
}
