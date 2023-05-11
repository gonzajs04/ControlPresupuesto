

import {useState} from 'react'
import Mensaje from './Mensaje.jsx'
function AgregarPresupuesto({presupuesto,setPresupuesto,setPresupuestoDefinido}){

    const [mensaje,setMensaje] = useState('')

    function handlePresupuesto(e){
        e.preventDefault();
        if(!presupuesto || presupuesto<0){
            
            setMensaje('No es un presupuesto valido')
            setPresupuesto(0)
            return
        }
           
        setMensaje('')
        setPresupuestoDefinido(true)
            
        
       
    }


    return(
        <div className="container-form">
            <form action="" onSubmit={handlePresupuesto} className="agregar-presupuesto">

                <label htmlFor="presupuesto">Definir presupuesto</label>
                <input type="number" value={presupuesto} placeholder="Añade tu presupuesto"  max={90000000000}
                    onChange={(e)=>{
                  
                
                        setPresupuesto(Number(e.target.value))
                      

                    }}
                />
                <input type="submit" value="AÑADIR"/>


                {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
            </form>
                    
        </div>



    )


}


export default AgregarPresupuesto;