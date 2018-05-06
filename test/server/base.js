
const {expect} = require("chai");

const {ClienteSwagger} = require("../../index.js");

describe("Test con servidor de mock", function(){

  let Cliente;

  before(function(hecho){

    this.timeout(0);

    require("../fixtures/server/index.js");

    setTimeout(hecho, 2000)
    
  })

  it("Permite arrancar un cliente", function(hecho){

    this.timeout(0);

    new ClienteSwagger("http://localhost:8080/api-docs", {

      "authorizations": {
        "ApiKeyHeader": "LOL"
      }
  
    }).iniciar()

    .then((cliente) => {

      Cliente = cliente;

      hecho();
    })

  })

  it("Permite realizar un hello", function(hecho){

    this.timeout(0);

    Cliente.procesar("Hello", "hello_get", {})

      .then(({body}) => {

        expect(body).to.be.an("object");
        expect(body.version).to.equal("0.1");

        hecho();
      })
  })

  it("Permite realizar un trabajo lento", function(hecho){

    this.timeout(0);

    Cliente.procesarPost("TrabajoLento", "trabajo_lento_get", {

      datos: {
        nombre: "Trabajo TEst",
        args: {a: 1, b: 2}
      }

    })

      .then(({body}) => {

        expect(body.jobId).to.be.an("string");

        return body.jobId;

      })

      .then((jobId)=>{

        Cliente.esperarPorJob("Job", "job_get", {id:jobId}, ({body}) => {

          console.log(body)

          if(body.estado === "FINISHED")
            hecho();

        })


      })

  })


})
