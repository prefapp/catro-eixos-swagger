const {expect} = require("chai");

const CargadorControladores = require("../../middleware/cargador.js");
const Tramitador = require("../../middleware/tramitar.js");

describe("MiddleWare - Cargador", function(){

    it("Permite cargar controladores", function(hecho){

        new CargadorControladores(

            __dirname + "/../fixtures/controladores"
        )
        .cargar()

        .then((cargado) => {

            hecho();

        })
        .catch((err) => {
            console.log(err);
            hecho(1);
        })

    })

})
