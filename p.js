const fs = require("fs");

function hazTarea(){

    return new Promise((cumplida, falla) => {

        fs.stat("aaaa.js", function(err, stats){

            if(err) falla(err);

            else    cumplida(stats);
        })

    })

}

function espera(stats){
    return new Promise((cumplida, falla) => {
        setTimeout(() =>{
            cumplida(stats);
        }, 1000)
    })
}

hazTarea()

    .then((stats) => {
        return espera(stats)
    })
    .then((resultados) => {
        console.log(resultados);
    })
    .catch((err) => {
        console.log(`ERROR ${err}`);
    })

