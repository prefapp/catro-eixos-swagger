const {expect} = require("chai");

const Constructor = require("../lib/producto/constructor.js");

const {tarea} = require("./utiles.js");

const fs = require("fs");
const jsyaml = require("js-yaml");

const TestProceso = require("./fixtures/proceso.js");

describe("ProcesoSwagger - Base", function(){

    let swaggerObjeto;

    before(() => {

        swaggerObjeto = jsyaml.safeLoad(

            fs.readFileSync(

                __dirname + "/fixtures/swagger.yaml"

            )

        )    

    })

    it("Construye un proceso swagger", function(hecho){

        let productos = new Constructor().construir(swaggerObjeto.definitions);

        let p = new TestProceso(

            tarea(
                "foo",

                {
                    __producto__: productos["FicheroMultimedia"]
                }
            )
        );

        p.ejecutar()

            .then(({resultados}) => {

                expect(resultados.__producto__).to.be.an("object");

                let p1 = resultados.__producto__;

                expect(p1.id).to.be.equal("foo");

                expect(p1.cacheado).to.be.equal(true);

                expect(p1.multimedia.format_name).to.be.equal("avi");

                hecho();
            })
            .catch((err) => {
                console.log(err);
                hecho(1);
            })

    })

    it("Controla los errores en seteo de producto", function(hecho){

        let productos = new Constructor().construir(swaggerObjeto.definitions);

        let p = new TestProceso(
    
            tarea(

                "foo", 

                {__producto__: productos["FicheroMultimedia"], que_falle: true}

            )

        );

        p.ejecutar()

        .then(({resultados}) => {

            console.log("No controla los errores");
            hecho(1);

        })
        .catch((err) => {

            //expect(err).to.be.an("string");
  //          console.log(err);

            hecho(0)

        })

    })

});
