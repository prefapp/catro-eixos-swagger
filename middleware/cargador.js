const fs = require("fs");
const path = require("path");

const debug = require("debug")("catro-eixos-swagger:cargador")

class CargadorControladores{

    constructor(ruta){

        this.ruta = ruta;
        this.debug = debug;
        this.modelosPeticiones = {};
    }

    cargar(){

        return new Promise((cumplida, falla) => {

            this.__cargarModulos(() => {

                cumplida(this);

            });

        })
    }

    __cargarModulos(hecho){

        this.debug(`[INICIO] Cargando controladores desde ${this.ruta}`);

        let regEsServicio = new RegExp(/(\w+Service)\.js$/);
        let regEsModelo = new RegExp(/(\w+)\.js$/);
        
        fs.readdir(this.ruta, (err, listado) => {

            if(err) 
                throw `Lectura directorio controladores ${this.ruta} : ${err}`

            listado.forEach((f) => {           
            
                if(regEsServicio.test(f)){

                    this.__cargarModulo(f, "servicio");                    
                }

            })

 //           this.debug(`${JSON.stringify(this.modelosPeticiones, 0, 3)}`)
            this.debug(`[FIN] Controladores cargados`);

            hecho();
        })
        
    }

    __cargarModulo(nombre, tipo){

        let modulo;

        try{
            modulo = require(path.join(this.ruta, nombre))
        }
        catch(e){

            throw `Error carga ${nombre}: ${e}`;
        }

        let nombreObjeto = nombre.replace(/\.js/, "");

        this.debug(`Cargado ${tipo} con nombre ${nombreObjeto} módulo ${nombre}`)

        if(tipo === "servicio"){
            this.modelosPeticiones[nombreObjeto] = this.__cargarModelosPeticiones(modulo);
        }
    }

    __cargarModelosPeticiones(modulo){

        let peticiones =  {};

        Object.keys(modulo)

            .filter(v => v.match(/_info$/))

            .forEach((p) => {

                let nombrePeticionResuelta = p.match(/(.+)_info$/)[1];

                peticiones[nombrePeticionResuelta] = modulo[p];
            })

        return peticiones;
    }
}

module.exports = CargadorControladores;


