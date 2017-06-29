const {expect} = require("chai");

const Producto = require("../../lib/producto/base.js");
const Primitivos = require("../../lib/producto/primitivos.js");
const ProductoCompuestoObjeto = require("../../lib/producto/compuesto.js");
const ProductoCompuestoArray = require("../../lib/producto/compuesto_array.js");

const {testearSet} = require("../utiles.js");

describe("Producto - Base", function(){

    it("Permite crear un producto base", function(){

        let p = new Producto("foo");

        expect(p.nombre).to.be.equal("foo");

    })

    it("Permite crear primitivos y validarlos", function(){

        let b = new Primitivos.boolean("foo");

        expect(b.nombre).to.be.equal("foo");

        expect(b.validar("hola")).to.be.equal(false);

        expect(b.validar(true)).to.be.equal(true);

        let s = new Primitivos.string("lol");

        expect(s.validar("hola")).to.be.equal(true);

        expect(s.validar(true)).to.be.equal(false);
    })

    it("Permite crear un compuesto que valida", function(){

        let b = new Primitivos.boolean();
        let s = new Primitivos.string();
        let i = new Primitivos.integer();

        let o = new ProductoCompuestoObjeto("objeto", {

            nombre: s,
            casado: b,
            edad: i

        });

        let v = o.validar(

            {nombre: "Fran", casado: false, edad: 37}

        )

        expect(v).to.be.equal(true);
        
        v = o.validar("");

        expect(v).to.be.equal(false);

        expect(o.ultimoError).to.match(/No es un objeto/);

        v = o.validar({no_existe: 1});

        expect(v).to.be.equal(false);

        v = o.validar({nombre: "foo"});

        expect(v).to.be.equal(true);

    })

    it("Permite el seteo de un objeto y controla las claves", () => {

        let b = new Primitivos.boolean();
        let s = new Primitivos.string();
        let i = new Primitivos.integer();

        let o = new ProductoCompuestoObjeto("objeto", {

            nombre: s,
            casado: b,
            edad: i
        });

        let p1 = o.getInstancia();

        p1.nombre = "foo";

        expect(p1.nombre).to.be.equal("foo");

        let err = testearSet(() => {

            p1.nombre = 1;

        })

        expect(err).to.be.an("string").and.to.match(/Se esperaba un string/);

        err = testearSet(() => {

            p1.foo = "asdf";

        })       

        expect(err).to.be.an("string").and.to.match(/CLAVE_NO_EXISTE/i);

    })

    it("Permite controla arrays", () => {

        let b = new Primitivos.boolean();
        let s = new Primitivos.string();
        let i = new Primitivos.integer();

        let o = new ProductoCompuestoObjeto("objeto", {

            nombre: s,
            casado: b,
            edad: i
        });

        let a = new ProductoCompuestoArray("array", {

            items: o

        });

        let pa = a.getInstancia();

        let err = testearSet(() => {
            pa.push({nombre: "fran", casado: "no"});
        });

        expect(err).to.be.an("string").and.to.match(/Se esperaba un boolean/);

        pa.push({nombre: "fran", casado: false});

        expect(pa[0].nombre).to.be.equal("fran");

        err = testearSet(() => {
            pa[0].edad = false;
        })
        
        expect(err).to.be.an("string").and.to.match(/Se esperaba un entero/);
    })
})
