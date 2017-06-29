const {expect} = require("chai");

const Constructor = require("../../lib/producto/constructor.js");

const {testearSet} = require("../utiles.js");

const fs = require("fs");
const jsyaml = require("js-yaml");

describe("Producto - Base", function(){

    let swaggerObjeto;

    before(() => {

        swaggerObjeto = jsyaml.safeLoad(

            fs.readFileSync(

                __dirname + "/../fixtures/swagger.yaml"

            )

        )    

    })

    it("Construye una jerarquía de objetos a partir de una especificación de swagger", function(){

        let c = new Constructor();
        
        let p = c.construir(swaggerObjeto.definitions);

        let a = p["FicherosMultimedia"].getInstancia();
        
        let err = testearSet(() => {
            a.offset = "no vale"
        });

        expect(err).to.be.an("string").and.to.match(/Se esperaba un entero/);

        let f = p["FicheroMultimedia"].getInstancia();

        err = testearSet(() => {
            f.cacheado = "asdf";
        });

        expect(err).to.be.an("string").and.to.match(/Se esperaba un boolean/);

        f.multimedia.format_name = "fa";

        expect(f.multimedia.format_name).to.be.equal("fa");

        err = testearSet(() => {
            f.multimedia.streams.push("foo");
        });

        expect(err).to.be.an("string").and.to.match(/No es un objeto/);

        f.multimedia.streams.push({codec_type: "audio"});

        err = testearSet(() => {
            f.multimedia.streams[0].codec_type = false;
        });

        expect(err).to.be.an("string").and.to.match(/Se esperaba un string/);
    })
});
