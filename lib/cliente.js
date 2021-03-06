const ClienteSwagger = require("swagger-client");

module.exports = class {

    constructor(url, opciones = {}){

        this.url = url;
        this.opciones = opciones;
        this._cliente;
    }

    iniciar(){

        return (async () => {

           this._cliente = await ClienteSwagger(

                this.url, 

                this.opciones

            )

            return this;   
            

        })();
    }

    procesar(tag, operacion, args){

        return this._cliente.apis[tag][operacion](args);

    }

    procesarPost(tag, operacion, args){

      return this.procesar(tag, operacion, args)
       // let post = args.post;

       // delete post.args;

       // return this._cliente.apis[tag][operacion](args, {

       //     requestInterceptor: (req) => {

       //         if(post){

       //             let headers = req.headers|| {};
       //             headers['Content-type'] = 'application/json';    
       //             req.body = JSON.stringify(post)

       //             return req;
       //         }

       //     }

       // })
    }

    esperarPorJob(tag, operacion, args, cumplida, refrescoJob=1000){

        let f = async (terminada) => {

            let r = await this.procesar(tag, operacion, args)

            if(cumplida(r)){
                terminada(r);
            }
            else{
                setTimeout(function(){
                    f(terminada);
                }, refrescoJob)
            }
        
        }

        return new Promise((terminada, fallida) => {

            f(terminada);

        })

    }


}
