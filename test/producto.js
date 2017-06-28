const {expect} = require("chai");

const Producto = require("../lib/producto.js");

describe("Producto - Base", function(){

    it("Controla un producto simple", (hecho) => {

        let esquema = {

            "type": "object",

            "properties": {
                "a":  {
                    "type": "integer",
                    "format": "int32",
                    "example": "WAITING|PROCESSING|FINISHED",
                    "description": "Estado de la tarea"
                }
            }
        }

        let p = new Producto("Tarea", esquema);

        let o = p.crearInstancia();

        o.a = 4;

        expect(o.a).to.be.equal(4)

        let error;

        try{
            o.a = "foo";
            console.log("Permite el set de un valor incorrecto");
            hecho(1);
        }
        catch(e){
            error = e;
        }

        expect(error).to.be.an("string");

        try{
            o.no_existe = 5;
            console.log("Permite el set de una clave inexistente");
            hecho(1);
        }
        catch(e){
            error = e;
        }

        expect(error).to.match(/no existe/)

        hecho();

    })

    it("Controla un producto complejo", (hecho) => {

        let e1 = {

          "type": "object",
      
          "properties": {
         
              "id": {
                  "type": "string",
                  "example": "asdfasasdasasdasas",
                  "description": "Identificador del Compuesto a crear"
              },
         
              "selecciones": {
                  "$ref": "#/definitions/CompuestoMultimediaEntradaSelecciones"
              },
         
          },
          
          "description": "Conjunto de datos de creación"
        }

        let e2 = {

            "type": "object",
                
            "properties": {
                    
                "alias": {
                    "type": "integer",  
                    "format": "int32",
                    "example": "high_video",
                    "description": "Identificador de la selección"
                },
                "fichero": {
                    "type": "string",
                    "example": "luz_casal_2017_as_pontes_high.mp4",
                    "description": "FicheroMultimedia de base"
                },
                "stream": {
                    "type": "string",
                    "example": "audio|video|num_stream",
                    "description": "Identificador del stream del fichero"
                }
            }
        }
        
        let p2 = new Producto("CompuestoMultimediaEntradaSelecciones", e2);
        let p1 = new Producto("Compuesto", e1);

        let almacen = {};

        almacen[p1.nombre] = p1;
        almacen[p2.nombre] = p2;

        let o2 = p2.crearInstancia(almacen);
        let o1 = p1.crearInstancia(almacen);

        o1.id = "foo";

        o1.selecciones.alias = 1;

        expect(o1.id).to.be.equal("foo");
        expect(o1.selecciones.alias).to.be.equal(1);

        error = undefined;

        try{
            o1.selecciones.alias = "no puedo";
            hecho(1);
        }
        catch(e){
            error = e;
        }

        expect(error).to.be.an("string");

        error = undefined;

        try{

            o1.selecciones = {no_existe : 1};

            hecho(1);
        }
        catch(e){
            error = e;
        }

        expect(error).to.match(/no existe/);

        error = undefined;

        try{
            o1.selecciones = {alias: "foo"};
            hecho(1);
        }
        catch(e){
            error = e;
        }

        expect(error).to.match(/incorrecto/);

        o1.selecciones = {
            alias: 3,
            stream: "#video",
            fichero: "/var/a"           
        } 
   
        hecho();
        
    })

    it("Controla productos con array", () => {

       let e1 = {

            "type": "array",
            "description": "Combinaciones de selecciones para producir un compuesto final",
            "items": {
                "$ref": "#/definitions/CompuestoMultimediaEntradaRefinado"
            }

        };
   


    })

})
