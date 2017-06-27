module.exports = function(operacion){

    let datos = operacion.match(/^([a-zA-Z]+)_(.+)$/);

    let familia = datos[1];

    familia = familia.charAt(0).toUpperCase() + familia.slice(1);

    return familia + "." + datos[2];

}
