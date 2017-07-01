const {boot, start} = require("../lib/bootstrap.js");

const {expect} = require("chai");

describe("Boostrap - base", function(){

    it("Permite hacer boots ordenados", function(hecho){

        let pasos = [];

        boot("Empezamos la carga", () => {
            console.log(1);
            pasos.push(1);
        })

        boot("Continuamos la carga", () => {
            console.log(2)
            pasos.push(2);
        })

        boot("Ponemos un refProcesador mock", function() {
            this.setProcesador({});
        })

        start(() => {

            expect(pasos[0]).to.be.equal(1);
            expect(pasos[1]).to.be.equal(2);

            hecho();

        }, {})
    })

})
