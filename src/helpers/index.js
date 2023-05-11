
    ////FUNCION PARA CONVERTIR MONEDA
    function convertirMoneda(numero){
        return numero.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'  

        })
    }


    


      export {convertirMoneda}

