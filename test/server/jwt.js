
const {expect} = require("chai");

const {ClienteSwagger} = require("../../index.js");

describe("Test de JWT con servidor de mock", function(){

  let Cliente;

  before(function(hecho){

    this.timeout(0);

    require("../fixtures/server/index_jwt.js");

    setTimeout(hecho, 2000)
    
  })

  it("Permite arrancar un cliente", function(hecho){

    this.timeout(0);

    new ClienteSwagger("http://localhost:8080/api-docs", {

      //"authorizations": {
      //  "ApiKeyHeader": "LOL"
      //}
  
    }).iniciar()

    .then((cliente) => {

      Cliente = cliente;

      hecho();
    })

  })

  it("Permite realizar un login", function(hecho){

    this.timeout(0);

    Cliente.procesarPost("Login", "login_realizar", {

        credenciales: {
            "usuario": "frmadem",
            "password": "123qwe//"
        }

    })

      .then(({body}) => {

        expect(body).to.be.an("object");
        expect(body.token).to.be.an("string");

        //seteamos el token para subsecuentes llamadas
        return Cliente.setApiKey(body.token);

      }).then(() => {

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


})
