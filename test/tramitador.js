const Tramitador = require("../lib/tramitador.js");

const {expect} = require("chai");

const fs = require("fs");
const jsyaml = require("js-yaml");

const TestProceso = require("./fixtures/proceso.js");
const {init} = require("catro-eixos-js");

describe("Tramitador - Base", function(){

    let swaggerObjeto;
    let refProcesador;

    before((hecho) => {

        swaggerObjeto = jsyaml.safeLoad(

            fs.readFileSync(

                __dirname + "/fixtures/swagger.yaml"

            )

        )    

        init({"Test": __dirname + "/fixtures"})

            .then((procesador) => {

                refProcesador = procesador;

                hecho()

            })

            .catch((err) => {hecho(1)})

    })

    it("el tramitador tramita peticiones", function(hecho){

        let T = new Tramitador(refProcesador, swaggerObjeto);

        let salida = {};

        T.tramitar("Test.proceso", {

            args: {que_falle: {value: false}},

            producto: "FicheroMultimedia",

            req: {},

            res: {
                
                setHeader: (a, b) => {salida.header = [a, b]},
                
                end: (r) => {

                    console.log(r);

                    try{
                        expect(r).to.be.an("string");

                        r = JSON.parse(r);

                        expect(r).to.be.an("object");

                        expect(r.id).to.be.equal("foo");
                        expect(r.multimedia.nb_streams).to.be.equal(5);

                        console.log(r); 
                        hecho();
    
                    }
                    catch(e){
                        console.log(e);
                        hecho(1);
                    }

                }
            }

        })

    })

    it("Permite una asignación directa", function(hecho){

        let T = new Tramitador(refProcesador, swaggerObjeto);

        let salida = {};

        T.tramitar("Test.proceso_directo", {

            args: {que_falle: {value: false}},

            producto: "FicheroMultimedia",

            req: {},

            res: {
                
                setHeader: (a, b) => {salida.header = [a, b]},
                
                end: (r) => {

                    console.log(r);

                    try{

                        expect(r).to.be.an("string");

                        r = JSON.parse(r);

                        expect(r).to.be.an("object");

                        expect(r.id).to.be.equal("foo");
                        expect(r.multimedia.nb_streams).to.be.equal(5);

                        console.log(r); 
                        hecho();
    
                    }
                    catch(e){
                      console.log(e);
                      hecho(1);
                    }

                }

            }
        })

    })

});
