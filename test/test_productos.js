const {expect} = require("chai");

const fs = require("fs");
const jsyaml = require("js-yaml");

const CrearProductos = require("../lib/crear_productos.js");

const {testearSet } = require("./utiles.js");

describe("Carga correctamente los produtos", () => {

    let swaggerObjeto;

    before(() => {

        swaggerObjeto = jsyaml.safeLoad(

            fs.readFileSync(

                __dirname + "/fixtures/swagger.yaml"

            )

        )    


    })

    it("Construye adecuadamente los objetos de producto", () =>{

        let p = new CrearProductos(swaggerObjeto).crear();

        let i = p["FicheroMultimedia"].crearInstancia(p);

        let e = testearSet(() => {
            i.cacheado = "alias";
        });

        expect(e).to.be.an("string").and.to.match(/incorrecto/);

        e = testearSet(() => {
            i.cacheado = true;
        });

        expect(i.cacheado).to.be.equal(true);
    })

    it("Construye adecuadamente los objetos con arrays", () => {

        let p = new CrearProductos(swaggerObjeto).crear();

        let i = p["FicherosMultimedia"].crearInstancia(p);

        let e = testearSet(() => {
            i.count = "no vale";
        })

        expect(e).to.be.an("string").and.to.match(/incorrecto/)    
        e = testearSet(() => {
            i.count = 1;
            i.offset = 2;
            i.limit = 99;
        })

        expect(e).to.equal(undefined);

        expect(i.count).to.equal(1);
        expect(i.offset).to.equal(2);
        expect(i.limit).to.equal(99);

        i.ficheros.push("asdf");

        let f = p["FicheroMultimedia"].crearInstancia(p);

        e = testearSet(() => {
            f.multimedia.nb_streams = "asdf";
        })

        expect(e).to.be.an("string").and.to.match(/incorrecto/);

        f.multimedia.streams.push("foo");
    })


})
