const fs = require("fs");

function hazTarea(callback){

    fs.stat("a.js", function(err, stats){

       if(err) return callback(err); 

        setTimeout(function(){
    
            console.log(stats);

            callback(null, "TAREA FINALIZADA");

        }, 1000);

    });
}

hazTarea(function(err, r){
    console.log(r);
});
