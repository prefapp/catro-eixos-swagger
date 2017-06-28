//let p = "listActiveCookies";
let p = "getCookies";

p = p.replace(/([A-Z])/g, function(a, b){

    return "_" + a.toLowerCase();

});

let partes = p.match(/(\_[a-z]+)$/);

let verbo = p.replace(/(\_[a-z]+$)/, "");

let entidad = partes[1].replace(/_/g, "").replace(/^(\w)/, function(a) { return a.toUpperCase()});

if(entidad.match(/s$/)){
    entidad = entidad.replace(/s$/, "");
    verbo += "_todos";
}

console.log(entidad + "." + verbo);

