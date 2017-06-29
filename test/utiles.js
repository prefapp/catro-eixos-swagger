const {Tarea} = require("catro-eixos-js");

module.exports = {

    testearSet: (setF) => {

        let error = undefined;

        try{
            setF()
        }
        catch(e){
            error = e;
        }

        return error;
    },

    tarea: (id, args) => {

        return new Tarea(id, args)
    }

};
