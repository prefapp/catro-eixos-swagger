const {expect} = require("chai");

const Transformador = require("../lib/transformador.js");

describe("Procesos - Nombre", function(){

    it("Controla correctamente el nombre de operacion", () => {

        let operacion = "fichero_get";

        expect(Transformador(

            operacion

        )).to.be.equal("Fichero.get");
    
        operacion = "FicheroMultimedia_getTodos";

        expect(Transformador(

            operacion

        )).to.be.equal("FicheroMultimedia.getTodos");

        operacion = "Fichero_get_todos_desde_s3";

        expect(Transformador(

            operacion

        )).to.be.equal("Fichero.get_todos_desde_s3");
    })

})
