"use strict";

const MiddleWareTramitar = require("./tramitar.js");
const CargadorControladores = require("./cargador.js");

const ProcesoSwagger = require("../lib/proceso_swagger.js");

const CrearProductos = require("../lib/producto/constructor.js");

const fs = require("fs"), 
      path = require("path");

const jsyaml = require('js-yaml');  

//se emplea para asociar los productos a los procesos 
//sin necesidad de tirar de una api rest
module.exports = function(refProcesador, opciones){

  return new CatroEixosSwaggerMiddlewareSinConexion(
    refProcesador,
    opciones
  )
    .cargar()

    .then(() => {
      return {refProcesador}
    })

    .catch((err) => {
      throw new Error(err);
    })
}


class CatroEixosSwaggerMiddlewareSinConexion{

  constructor(refProcesador, opciones = {}){

    this.refProcesador = refProcesador; 
    this.controladores = opciones.controladores;

    if(!opciones.swaggerApi)
      throw "Falta la ruta de la swaggerApi";

    this.swaggerApi = opciones.swaggerApi;
  }

  cargar(){

    return new CargadorControladores(

      this.controladores

    )
      .cargar()

      .then((cargador) => {

        let productos = this.__cargarProductos();

        return {cargador, productos}
      })

      .then(({cargador, productos}) => {
  
        let ProcesosProductos = {};      

        Object.keys(cargador.modelosPeticiones).map((modelo) => {

          let familia = modelo.replace(/Service$/, "");

          let procesos = cargador.modelosPeticiones[modelo];

          Object.keys(procesos).map((proceso) => {

            return {

              nombreProceso: proceso.replace(familia + "_", ""),

              producto: procesos[proceso].producto

            }

          }).map((p) => {

            ProcesosProductos[familia + "." + p.nombreProceso] = productos[p.producto];

          })

        })

        ProcesoSwagger.setRefProductosSwagger(ProcesosProductos);

      })
  } 

  __cargarProductos(){

    let spec = fs.readFileSync(this.swaggerApi, 'utf8');
    let swaggerDoc = jsyaml.safeLoad(spec); 

    return new CrearProductos()

      .construir(swaggerDoc.definitions)
    
  }

}
