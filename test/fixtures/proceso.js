const ProcesoSwagger = require("../../lib/proceso_swagger.js");

class TestProceso extends ProcesoSwagger{

    __r(){

       return ["__setFichero", "__setInfoMultimedia"]
    }

    __setFichero(){

        this.producto().id = "foo";
        this.producto().cacheado = true;
    }

    __setInfoMultimedia(){

        this.producto().multimedia.nb_streams = 5;
        this.producto().multimedia.format_name = "avi";

        if(this.arg("que_falle")){
            this.producto().multimedia.streams.push("foo");
        }

    }

    KO__setInfoMultimedia(err){
        this.error(`[INFO_MULTIMEDIA][${err}]`);
    }
}

module.exports = TestProceso;
