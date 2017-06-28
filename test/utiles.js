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
    }

};
